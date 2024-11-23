<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', [TestController::class, 'index']);

//Route::get('/users', [UserController::class, 'index']); // Получить всех пользователей
//Route::get('/users/{id}', [UserController::class, 'show']); // Получить одного пользователя
//Route::post('/users', [UserController::class, 'store']); // Создать пользователя
//Route::put('/users/{id}', [UserController::class, 'update']); // Обновить пользователя
//Route::delete('/users/{id}', [UserController::class, 'destroy']); // Удалить пользователя
