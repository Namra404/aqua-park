<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlideReview extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'slide_id', 'comment', 'rating'];

    // Связь с пользователем
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Связь с горкой
    public function slide() {
        return $this->belongsTo(Slide::class);
    }
}
