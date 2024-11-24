<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SlideReview;
use Illuminate\Http\Request;

class SlideReviewController extends Controller
{
    public function index()
    {
        $reviews = SlideReview::all();
        return response()->json($reviews);
    }

    public function show($id)
    {
        $review = SlideReview::find($id);
        if (!$review) {
            return response()->json(['message' => 'Slide Review not found'], 404);
        }
        return response()->json($review);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review = SlideReview::create($validated);
        return response()->json($review, 201);
    }

    public function update(Request $request, $id)
    {
        $review = SlideReview::find($id);
        if (!$review) {
            return response()->json(['message' => 'Slide Review not found'], 404);
        }

        $validated = $request->validate([
            'user_id' => 'nullable|integer|exists:users,id',
            'rating' => 'nullable|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $review->update($validated);
        return response()->json($review);
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
