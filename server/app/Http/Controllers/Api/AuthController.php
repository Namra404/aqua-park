<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth; // Импортируем JWT

class AuthController extends Controller
{
    // Регистрация нового пользователя
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed', // Добавляем подтверждение пароля
        ]);

        // Создаем нового пользователя
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Создаем JWT токен
        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    // Логин (выдача токена)
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Пытаемся авторизовать пользователя
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        // Возвращаем пользователя и токен
        $user = auth()->user();
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    // Логаут (удаление токена)
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken()); // Отменяем токен

        return response()->json(['message' => 'Logged out']);
    }

    // Получение текущего пользователя с токеном
    public function me()
    {
        return response()->json(auth()->user());
    }
}
