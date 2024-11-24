<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'total_price' => 'required|numeric|min:0',
            'promo_code' => 'nullable|string|exists:promo_codes,code',
        ]);

        $user = Auth::user();
        $promoCode = null;
        $discount = 0;

        // Проверяем промокод, если он передан
        if ($request->filled('promo_code')) {
            $promoCode = PromoCode::where('code', $request->promo_code)->first();

            if (!$promoCode->isValid()) {
                return response()->json(['error' => 'Promo code is expired or invalid'], 400);
            }

            $discount = ($request->total_price * $promoCode->discount) / 100;
        }

        // Создаем заказ
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $request->total_price - $discount,
            'promo_code_id' => $promoCode?->id,
            'discount' => $discount,
        ]);

        return response()->json(['order' => $order], 201);
    }
}
