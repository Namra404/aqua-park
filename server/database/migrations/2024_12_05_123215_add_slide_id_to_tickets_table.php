<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class AddSlideIdToTicketsTable extends Migration
{
    public function up()
    {
        Schema::table('tickets', function (Blueprint $table) {
            // Если у вас было поле 'slide', его можно удалить
            $table->dropColumn('slide');

            // Добавляем поле slide_id
            $table->foreignId('slide_id')->after('user_id')->constrained('slides')->onDelete('cascade');

            // Если поля 'status' еще нет, добавьте его
        });
    }

    public function down()
    {
        Schema::table('tickets', function (Blueprint $table) {
            $table->dropForeign(['slide_id']);
            $table->dropColumn('slide_id');
            $table->dropColumn('status');
            // Если нужно, можно вернуть поле 'slide'
            $table->string('slide')->after('date');
        });
    }
}
