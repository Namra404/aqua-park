<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Service;
use App\Models\Ticket;
use App\Models\TicketService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TicketServiceController extends Controller
{
    public function index()
    {
        $services = TicketService::all();
        return response()->json($services);
    }

    public function show($id)
    {
        $service = TicketService::find($id);
        if (!$service) {
            return response()->json(['message' => 'Ticket Service not found'], 404);
        }
        return response()->json($service);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ticket_id' => 'required|integer|exists:tickets,id',
            'service_id' => 'required|integer|exists:services,id',
        ]);

        DB::transaction(function () use ($validated, &$ticketService) {
            $ticketService = TicketService::create($validated);

            $ticket = Ticket::find($validated['ticket_id']);
            $service = Service::find($validated['service_id']);

            // Обновляем цену билета
            $ticket->price += $service->price;
            $ticket->save();

            // Обновляем цену заказа
            $order = $ticket->order;
            if ($order) {
                // Пересчитываем total_price заказа
                $this->updateOrderTotalPrice($order);
            }
        });

        return response()->json($ticketService, 201);
    }

    public function destroy($id)
    {
        $ticketService = TicketService::find($id);
        if (!$ticketService) {
            return response()->json(['message' => 'Ticket Service not found'], 404);
        }

        DB::transaction(function () use ($ticketService) {
            $ticket = Ticket::find($ticketService->ticket_id);
            $service = Service::find($ticketService->service_id);

            if ($ticket && $service) {
                $ticket->price -= $service->price;
                $ticket->price = max($ticket->price, 0); // Убедимся, что цена не отрицательная
                $ticket->save();

                // Обновляем цену заказа
                $order = $ticket->order;
                if ($order) {
                    // Пересчитываем total_price заказа
                    $this->updateOrderTotalPrice($order);
                }
            }

            $ticketService->delete();
        });

        return response()->json(['message' => 'Ticket Service deleted successfully']);
    }



    private function updateOrderTotalPrice(Order $order)
    {
        // Получаем тикеты заказа со статусом 'не забронирован'
        $tickets = $order->tickets()->where('status', 'не забронирован')->get();

        // Вычисляем общую сумму цен этих тикетов
        $totalPrice = $tickets->sum('price');

        $discount = 0;
        if ($order->promoCode) {
            // Если есть промокод, применяем скидку
            $discount = ($totalPrice * $order->promoCode->discount) / 100;
        }

        // Обновляем поля total_price и discount в заказе
        $order->total_price = $totalPrice - $discount;
        $order->discount = $discount;
        $order->save();
    }
}
