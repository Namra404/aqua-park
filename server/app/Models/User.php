<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    // Разрешённые поля для массового заполнения
    protected $fillable = ['name', 'email', 'password', 'role'];

    // Связь с билетами
    public function tickets() {
        return $this->hasMany(Ticket::class);
    }

    // Связь с отзывами на горки
    public function slideReviews() {
        return $this->hasMany(SlideReview::class);
    }

    // Связь с отзывами на дополнительные услуги
    public function serviceReviews() {
        return $this->hasMany(ServiceReview::class);
    }
}
