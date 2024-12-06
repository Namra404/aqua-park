<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyExpiresAtInPromoCodesTable extends Migration
{
    public function up()
    {
        Schema::table('promo_codes', function (Blueprint $table) {
            $table->timestamp('expires_at')->change();
        });
    }

    public function down()
    {
        Schema::table('promo_codes', function (Blueprint $table) {
            // Восстановите предыдущий тип, если необходимо
            $table->dateTime('expires_at')->change();
        });
    }
}
