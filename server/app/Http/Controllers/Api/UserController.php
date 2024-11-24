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
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,manager,user',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user,
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
        $user->delete();
        return response()->json([
            'message' => 'User deleted successfully!',
        ]);
    }
}
