<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price', 'image'];

    // Связь с билетами
    public function tickets() {
        return $this->belongsToMany(Ticket::class, 'ticket_services');
    }

    // Связь с отзывами
    public function reviews() {
        return $this->hasMany(ServiceReview::class);
    }
}
