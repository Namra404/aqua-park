<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with('slide')->get();
        return response()->json($tickets);
    }

    public function show($id)
    {
        $ticket = Ticket::with('slide')->find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }
        return response()->json($ticket);
    }

    public function store(Request $request)
    {
        // Валидация данных запроса и присвоение результата переменной $validated
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'slide_id' => 'required|integer|exists:slides,id',
            'type' => 'required|in:до 12,после 12',
            'price' => 'required|numeric',
            'date' => 'nullable|date',
            'status' => 'required|in:забронирован,не забронирован',
        ]);

        // Создание нового тикета с использованием валидированных данных
        $ticket = Ticket::create($validated);

        // Загружаем связь slide
        $ticket->load('slide');

        // Возвращаем созданный тикет в формате JSON с кодом ответа 201
        return response()->json($ticket, 201);
    }

    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        // Валидация данных запроса и присвоение результату переменной $validated
        $validated = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
            'slide_id' => 'nullable|integer|exists:slides,id',
            'type' => 'nullable|in:до 12,после 12',
            'price' => 'nullable|numeric',
            'date' => 'nullable|date',
            'status' => 'nullable|in:забронирован,не забронирован',
        ]);

        // Обновление тикета с использованием валидированных данных
        $ticket->update($validated);

        // Загружаем связь slide
        $ticket->load('slide');

        return response()->json($ticket);
    }

    public function destroy($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $ticket->delete();
        return response()->json(['message' => 'Ticket deleted successfully']);
    }
}
