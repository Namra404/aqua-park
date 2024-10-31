<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['visitor_id', 'ticket_id', 'quantity', 'total_price', 'purchase_date'];

    public function visitor()
    {
        return $this->belongsTo(Visitor::class);
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }
}
