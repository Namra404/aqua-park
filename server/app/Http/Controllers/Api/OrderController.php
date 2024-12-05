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
    public function store(Request $request)
    {
        $request->validate([
            'total_price' => 'required|numeric|min:0',
            'promo_code' => 'nullable|string|exists:promo_codes,code',
            'tickets' => 'required|array|min:1',
            'tickets.*.slide_id' => 'required|integer|exists:slides,id',
            'tickets.*.type' => 'required|in:до 12,после 12',
            'tickets.*.price' => 'required|numeric|min:0',
            'tickets.*.date' => 'nullable|date',
            'tickets.*.status' => 'required|in:забронирован,не забронирован',
        ]);

        $user = Auth::user();
        $promoCode = null;
        $discount = 0;

        // Проверяем промокод, если он передан
        if ($request->filled('promo_code')) {
            $promoCode = PromoCode::where('code', $request->promo_code)->first();

            if (!$promoCode || !$promoCode->isValid()) {
                return response()->json(['error' => 'Promo code is expired or invalid'], 400);
            }

            $discount = ($request->total_price * $promoCode->discount) / 100;
        }

        // Используем транзакцию для обеспечения целостности данных
        DB::transaction(function () use ($request, $user, $promoCode, $discount, &$order) {
            // Создаем заказ
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $request->total_price - $discount,
                'promo_code_id' => optional($promoCode)->id,
                'discount' => $discount,
            ]);

            // Добавляем тикеты к заказу
            foreach ($request->tickets as $ticketData) {
                $order->tickets()->create([
                    'user_id' => $user->id,
                    'slide_id' => $ticketData['slide_id'],
                    'type' => $ticketData['type'],
                    'price' => $ticketData['price'],
                    'date' => $ticketData['date'] ?? null,
                    'status' => $ticketData['status'],
                ]);
            }
        });

        // Возвращаем заказ с загруженными тикетами и слайдами
        return response()->json(['order' => $order->load('tickets.slide')], 201);
    }
}
