<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class AquaPark extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'location'];

    public function rides()
    {
        return $this->hasMany(Ride::class);
    }

    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
