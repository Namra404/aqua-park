<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Получение всех пользователей
    public function index()
    {
        $authenticatedUser = auth()->user(); // Получаем текущего авторизованного пользователя

        // Разрешаем удаление только администратору или самому пользователю
        if ($authenticatedUser->role !== 'admin' && $authenticatedUser->id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        $users = User::all();
        return response()->json($users);
    }

    // Создание нового пользователя (для этого может быть доступ только администратор)
    public function store(Request $request)
    {
        $user = auth()->user(); // Получаем текущего авторизованного пользователя

        // Разрешаем создание пользователей только администраторам
        if ($user->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,manager,user',
        ]);

        $newUser = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' => 'User created successfully!',
            'user' => $newUser,
        ], 201);
    }

    // Получение одного пользователя
    public function show(User $user)
    {
        return response()->json($user);
    }

    // Обновление пользователя
    public function update(Request $request, User $user)
    {
        $authenticatedUser = auth()->user(); // Получаем текущего авторизованного пользователя

        // Разрешаем обновление только администратору или самому пользователю
        if ($authenticatedUser->role !== 'admin' && $authenticatedUser->id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,manager,user',
        ]);

        $user->update($validated);
        return response()->json([
            'message' => 'User updated successfully!',
            'user' => $user,
        ]);
    }

    // Удаление пользователя
    public function destroy(User $user)
    {
        $authenticatedUser = auth()->user(); // Получаем текущего авторизованного пользователя

        // Разрешаем удаление только администратору или самому пользователю
        if ($authenticatedUser->role !== 'admin' && $authenticatedUser->id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully!',
        ]);
    }
}
