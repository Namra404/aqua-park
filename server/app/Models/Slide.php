<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slide extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    // Связь с отзывами
    public function reviews() {
        return $this->hasMany(SlideReview::class);
    }
}
