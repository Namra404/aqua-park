<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::all();
        return response()->json($tickets);
    }

    public function show($id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }
        return response()->json($ticket);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'type' => 'required|in:до 12,после 12', // Добавлена валидация type
            'price' => 'required|numeric',
            'date' => 'nullable|date',
        ]);

        $ticket = Ticket::create($validated);
        return response()->json($ticket, 201);
    }

    public function update(Request $request, $id)
    {
        $ticket = Ticket::find($id);
        if (!$ticket) {
            return response()->json(['message' => 'Ticket not found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
            'type' => 'nullable|in:до 12,после 12', // Добавлена валидация type
            'price' => 'nullable|numeric',
            'date' => 'nullable|date',
        ]);

        $ticket->update($validated);
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
