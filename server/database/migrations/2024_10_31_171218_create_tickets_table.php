<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // database/migrations/xxxx_xx_xx_create_tickets_table.php
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // Например, взрослый, детский, семейный
            $table->decimal('price');
            $table->integer('duration')->nullable(); // Продолжительность в минутах
            $table->foreignId('aqua_park_id')->constrained('aqua_parks')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
