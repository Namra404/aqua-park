<?php

use App\Http\Controllers\AquaParkController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RideController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\VisitorController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
Route::apiResource('aqua-parks', AquaParkController::class);
Route::apiResource('rides', RideController::class);
Route::apiResource('tickets', TicketController::class);
Route::apiResource('visitors', VisitorController::class);
Route::apiResource('orders', OrderController::class);
