<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'type', 'price', 'date']; // Добавлено поле type

    // Связь с пользователем
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Связь с дополнительными услугами
    public function services() {
        return $this->belongsToMany(Service::class, 'ticket_services');
    }
}
