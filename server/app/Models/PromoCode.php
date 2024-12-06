<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PromoCode extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'discount', 'expires_at'];

    // Убедитесь, что поле expires_at обрабатывается как дата
    protected $casts = [
        'expires_at' => 'datetime',
    ];

    /**
     * Проверяет, действителен ли промокод.
     *
     * @return bool
     */
    public function isValid()
    {
        return $this->expires_at->isFuture();
    }

    // Связь с заказами (если необходимо)
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
