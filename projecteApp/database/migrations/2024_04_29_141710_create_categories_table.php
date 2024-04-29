<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->unsignedBigInteger('cat_id')->autoIncrement();
            $table->unsignedBigInteger('cat_esp_id');
            $table->string('cat_nom', 20);
            $table->timestamps();

            $table->foreign('cat_esp_id')->references('esp_id')->on('esports');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
};
