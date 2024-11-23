<?php

use App\Http\Controllers\Api\Testing;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;


Route::apiResource('users', UserController::class);
Route::apiResource('testing', Testing::class);
