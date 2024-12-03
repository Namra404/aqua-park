<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceReview;
use Illuminate\Http\Request;

class ServiceReviewController extends Controller
{
    public function index()
    {
        // Получить все отзывы с данными о пользователях и услугах
        $reviews = ServiceReview::with(['user', 'service'])->get();
        return response()->json($reviews);
    }

    public function show($id)
    {
        // Найти конкретный отзыв с данными о пользователе и услуге
        $review = ServiceReview::with(['user', 'service'])->find($id);
        if (!$review) {
            return response()->json(['message' => 'Service Review not found'], 404);
        }
        return response()->json($review);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'service_id' => 'required|integer|exists:services,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = ServiceReview::create($validated);
        return response()->json($review->load(['user', 'service']), 201); // Подгружаем данные о пользователе и услуге
    }

    public function update(Request $request, $id)
    {
        $review = ServiceReview::find($id);
        if (!$review) {
            return response()->json(['message' => 'Service Review not found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
            'service_id' => 'nullable|integer|exists:services,id',
            'rating' => 'nullable|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($validated);
        return response()->json($review->load(['user', 'service'])); // Подгружаем данные о пользователе и услуге
    }

    public function destroy($id)
    {
        $review = ServiceReview::find($id);
        if (!$review) {
            return response()->json(['message' => 'Service Review not found'], 404);
        }

        $review->delete();
        return response()->json(['message' => 'Service Review deleted successfully']);
    }
}
