<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TicketService;
use Illuminate\Http\Request;

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

        $service = TicketService::create($validated);
        return response()->json($service, 201);
    }

    public function destroy($id)
    {
        $service = TicketService::find($id);
        if (!$service) {
            return response()->json(['message' => 'Ticket Service not found'], 404);
        }

        $service->delete();
        return response()->json(['message' => 'Ticket Service deleted successfully']);
    }
}
