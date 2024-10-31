<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'birth_date'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
