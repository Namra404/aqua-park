<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_price',
        'promo_code_id',
        'discount',
    ];

    protected $with = ['tickets'];

    // Связь с пользователем
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Связь с промокодом
    public function promoCode()
    {
        return $this->belongsTo(PromoCode::class);
    }

    // Связь с тикетами
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
