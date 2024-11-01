<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'price', 'duration', 'aqua_park_id'];

    public function aquaPark()
    {
        return $this->belongsTo(AquaPark::class);
    }
}
