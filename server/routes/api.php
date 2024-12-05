<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PromoCodeController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ServiceReviewController;
use App\Http\Controllers\Api\SlideController;
use App\Http\Controllers\Api\SlideReviewController;
use app\Http\Controllers\Api\Testing;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\TicketServiceController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;




Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);



Route::middleware('auth:api')->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('tickets', TicketController::class);
    Route::apiResource('slides', SlideController::class);
    Route::apiResource('ticket-service', TicketServiceController::class);
    Route::apiResource('slide-review', SlideReviewController::class);
    Route::apiResource('promo-code', PromoCodeController::class);
    Route::apiResource('service', ServiceController::class);
    Route::apiResource('service-review', ServiceReviewController::class);
    Route::apiResource('orders', OrderController::class);
    Route::apiResource('testing', Testing::class);

    Route::middleware('role:admin')->group(function () {
        Route::put('users/{user}', [UserController::class, 'update']);
        Route::get('users', [UserController::class, 'index']);
        Route::delete('users/{user}', [UserController::class, 'destroy']);
    });

});


