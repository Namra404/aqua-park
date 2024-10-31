<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ride extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'height_requirement', 'aqua_park_id'];

    public function aquaPark()
    {
        return $this->belongsTo(AquaPark::class);
    }
}

