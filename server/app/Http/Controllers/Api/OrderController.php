<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{

    public function index(Request $request)
    {
        $user = Auth::user();

        $status = $request->query('status');

        if ($status && !in_array($status, ['забронирован', 'не забронирован'])) {
            return response()->json(['error' => 'Недопустимый статус'], 400);
        }

        // Получаем заказы текущего пользователя с загрузкой связанных моделей
        $orders = Order::where('user_id', $user->id)
            ->whereHas('tickets', function ($query) use ($status) {
                if ($status) {
                    $query->where('status', $status);
                }
            })
            ->with(['tickets' => function ($query) use ($status) {
                if ($status) {
                    $query->where('status', $status);
                }
                $query->with('slide', 'services');
            }])
            ->get();

        return response()->json(['orders' => $orders], 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'promo_code' => 'nullable|string|exists:promo_codes,code',
            'tickets' => 'required|array|min:1',
            'tickets.*.slide_id' => 'required|integer|exists:slides,id',
            'tickets.*.type' => 'required|in:до 12,после 12',
            'tickets.*.price' => 'required|numeric|min:0',
            'tickets.*.date' => 'nullable|date',
            'tickets.*.status' => 'required|in:забронирован,не забронирован',
            'tickets.*.services' => 'nullable|array',
            'tickets.*.services.*' => 'integer|exists:services,id',
        ]);

        $user = Auth::user();
        $promoCode = null;
        $discount = 0;

        // Используем транзакцию для обеспечения целостности данных
        DB::transaction(function () use ($request, $user, &$promoCode, &$discount, &$order) {
            // Создаем заказ без указания total_price и discount
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => 0, // Будем обновлять позже
                'promo_code_id' => null,
                'discount' => 0, // Будем обновлять позже
            ]);

            $totalPrice = 0;

            // Добавляем тикеты к заказу
            foreach ($request->tickets as $ticketData) {
                $ticket = $order->tickets()->create([
                    'user_id' => $user->id,
                    'slide_id' => $ticketData['slide_id'],
                    'type' => $ticketData['type'],
                    'price' => $ticketData['price'],
                    'date' => $ticketData['date'] ?? null,
                    'status' => $ticketData['status'],
                ]);

                // Прикрепляем услуги к билету, если они предоставлены
                if (!empty($ticketData['services'])) {
                    $ticket->services()->attach($ticketData['services']);
                }

                // Если статус билета "не забронирован", добавляем его цену к totalPrice
                if ($ticketData['status'] === 'не забронирован') {
                    $totalPrice += $ticketData['price'];
                }
            }

            // Проверяем промокод, если он передан
            if ($request->filled('promo_code')) {
                $promoCode = PromoCode::where('code', $request->promo_code)->first();

                if (!$promoCode || !$promoCode->isValid()) {
                    throw new \Exception('Промокод истек или недействителен', 400);
                }

                $discount = ($totalPrice * $promoCode->discount) / 100;
            }

            // Обновляем заказ с вычисленным total_price и discount
            $order->update([
                'total_price' => $totalPrice - $discount,
                'promo_code_id' => optional($promoCode)->id,
                'discount' => $discount,
            ]);
        });

        // Возвращаем заказ с загруженными тикетами, слайдами и услугами
        return response()->json(['order' => $order->load('tickets.slide', 'tickets.services')], 201);
    }
}
