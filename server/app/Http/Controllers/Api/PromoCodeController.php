<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PromoCode;
use Illuminate\Http\Request;

class PromoCodeController extends Controller
{
    // Применение промокода
    public function apply(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string',
        ]);

        $promo = PromoCode::where('code', $validated['code'])
            ->where('expires_at', '>', now())
            ->first();

        if (!$promo) {
            return response()->json(['message' => 'Invalid or expired promo code.'], 404);
        }

        return response()->json([
            'message' => 'Promo code applied successfully!',
            'discount' => $promo->discount,
        ]);
    }

    public function store(Request $request)
    {
        // Валидация входных данных
        $validated = $request->validate([
            'code' => 'required|string|unique:promo_codes,code',
            'discount' => 'required|integer|min:1|max:100', // Процент скидки
            'expires_at' => 'required|date|after:today',
        ]);

        // Создание промокода
        $promo = PromoCode::create([
            'code' => $validated['code'],
            'discount' => $validated['discount'],
            'expires_at' => $validated['expires_at'],
        ]);

        return response()->json([
            'message' => 'Promo code created successfully!',
            'promo_code' => $promo,
        ], 201);
    }
}
