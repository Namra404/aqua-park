<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Slide;
use Illuminate\Http\Request;

class SlideController extends Controller
{
    // Получение всех слайдов
    public function index()
    {
        $slides = Slide::all();
        return response()->json($slides);
    }

    // Создание нового слайда
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string', // Убедитесь, что передаётся ссылка на изображение
            'category' => 'nullable|string',
        ]);

        $slide = Slide::create($validated);
        return response()->json([
            'message' => 'Slide created successfully!',
            'slide' => $slide,
        ], 201);
    }

    // Получение одного слайда
    public function show(Slide $slide)
    {
        return response()->json($slide);
    }

    // Обновление слайда
    public function update(Request $request, Slide $slide)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $slide->update($validated);
        return response()->json([
            'message' => 'Slide updated successfully!',
            'slide' => $slide,
        ]);
    }

    // Удаление слайда
    public function destroy(Slide $slide)
    {
        $slide->delete();
        return response()->json(['message' => 'Slide deleted successfully!']);
    }
}
