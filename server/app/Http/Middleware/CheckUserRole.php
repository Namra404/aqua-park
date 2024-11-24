<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string  $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        // Предполагаем, что пользовательская информация доступна через JWT
        $user = $request->user(); // Или используйте вашу JWT-библиотеку, например $decodedToken

        // Проверка, есть ли пользователь и соответствует ли его роль требуемой
        if (!$user || $user->role !== $role) {
            return response()->json([
                'message' => 'Forbidden'
            ], Response::HTTP_FORBIDDEN); // Код 403
        }

        return $next($request);
    }
}
