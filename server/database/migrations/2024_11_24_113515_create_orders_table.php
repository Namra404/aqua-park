<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Связь с таблицей users
            $table->decimal('total_price', 10, 2); // Итоговая сумма
            $table->foreignId('promo_code_id')->nullable()->constrained('promo_codes')->onDelete('set null'); // Промокод
            $table->decimal('discount', 10, 2)->default(0); // Примененная скидка
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
