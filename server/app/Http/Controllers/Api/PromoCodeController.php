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
}
