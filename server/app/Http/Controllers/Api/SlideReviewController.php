<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SlideReview;
use Illuminate\Http\Request;

class SlideReviewController extends Controller
{
    public function index(Request $request)
    {
        // Создаем базовый запрос с подгрузкой связанных моделей
        $query = SlideReview::with(['user', 'slide']);

        // Проверяем, есть ли в запросе параметр slide_id
        if ($request->has('slide_id')) {
            $slideId = $request->query('slide_id');
            // Можно добавить дополнительную валидацию slideId если необходимо
            $query->where('slide_id', $slideId);
        }

        // Выполняем запрос и получаем отзывы
        $reviews = $query->get();

        return response()->json($reviews);
    }

    public function show($id)
    {
        // Найти конкретный отзыв с данными о пользователе и горке
        $review = SlideReview::with(['user', 'slide'])->find($id);
        if (!$review) {
            return response()->json(['message' => 'Slide Review not found'], 404);
        }
        return response()->json($review);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'slide_id' => 'required|integer|exists:slides,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = SlideReview::create($validated);
        return response()->json($review->load(['user', 'slide']), 201); // Подгружаем данные о пользователе и горке
    }

    public function update(Request $request, $id)
    {
        $review = SlideReview::find($id);
        if (!$review) {
            return response()->json(['message' => 'Slide Review not found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
            'slide_id' => 'nullable|integer|exists:slides,id',
            'rating' => 'nullable|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($validated);
        return response()->json($review->load(['user', 'slide'])); // Подгружаем данные о пользователе и горке
    }

    public function destroy($id)
    {
        $review = SlideReview::find($id);
        if (!$review) {
            return response()->json(['message' => 'Slide Review not found'], 404);
        }

        $review->delete();
        return response()->json(['message' => 'Slide Review deleted successfully']);
    }
}
