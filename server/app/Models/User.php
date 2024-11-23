<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $primaryKey = 'user_id'; // Указываем имя первичного ключа
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone_number',
        'role',
    ];
}
