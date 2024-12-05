<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'slide_id', 'type', 'price', 'date', 'status'];
    protected $with = ['slide', 'services'];
    // Связь с пользователем
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Связь с слайдом
    public function slide()
    {
        return $this->belongsTo(Slide::class);
    }

    // Связь с дополнительными услугами
    public function services()
    {
        return $this->belongsToMany(Service::class, 'ticket_services');
    }
}
