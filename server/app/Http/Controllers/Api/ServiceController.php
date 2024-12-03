<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    // Получение всех сервисов
    public function index()
    {
        $services = Service::all();
        return response()->json($services);
    }

    // Создание нового сервиса
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string|max:2048', // Проверяем, что image — строка (например, URL)
        ]);

        $service = Service::create($validated);
        return response()->json([
            'message' => 'Service created successfully!',
            'service' => $service,
        ], 201);
    }

    // Обновление сервиса
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|string|max:2048', // Проверяем, что image — строка
        ]);

        $service->update($validated);
        return response()->json([
            'message' => 'Service updated successfully!',
            'service' => $service,
        ]);
    }

    // Удаление сервиса
    public function destroy(Service $service)
    {
        $service->delete();
        return response()->json(['message' => 'Service deleted successfully!']);
    }
}
