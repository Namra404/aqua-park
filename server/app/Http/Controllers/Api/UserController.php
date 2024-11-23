<?php

namespace app\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Получение всех пользователей
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Получение одного пользователя
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    // Создание пользователя
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone_number' => 'nullable|string|max:15',
            'role' => 'nullable|string|in:customer,admin,manager',
        ]);

        $user = User::create($validated);
        return response()->json($user, 201);
    }

    // Обновление пользователя
    public function update(Request $request, $userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users,email,' . $userId . ',user_id', // Используйте user_id вместо id
            'password' => 'nullable|string|min:6',
            'phone_number' => 'nullable|string|max:15',
            'role' => 'nullable|string|in:customer,admin,manager',
        ]);

        if (isset($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        }

        $user->update($validated);
        return response()->json($user);
    }

    // Удаление пользователя
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
