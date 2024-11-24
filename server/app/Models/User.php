<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    // Разрешенные поля для массового заполнения
    protected $fillable = ['name', 'email', 'password', 'role'];

    // Связь с билетами
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }

    // Связь с отзывами на горки
    public function slideReviews()
    {
        return $this->hasMany(SlideReview::class);
    }

    // Связь с отзывами на дополнительные услуги
    public function serviceReviews()
    {
        return $this->hasMany(ServiceReview::class);
    }

    // Реализация метода getJWTIdentifier
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    // Реализация метода getJWTCustomClaims
    public function getJWTCustomClaims()
    {
        return [];
    }
}
