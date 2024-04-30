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
        Schema::create('curses', function (Blueprint $table) {
            $table->unsignedBigInteger('cur_id')->autoIncrement();
            $table->string('cur_nom');
            $table->dateTime('cur_data_inici');
            $table->dateTime('cur_data_fi');
            $table->string('cur_lloc', 20);
            $table->unsignedBigInteger('cur_esp_id');
            $table->unsignedBigInteger('cur_est_id');
            $table->text('cur_desc')->nullable();
            $table->integer('cur_limit_inscr');
            $table->string('cur_foto', 256)->nullable();
            $table->string('cur_web', 256)->nullable();
            $table->timestamps();

            $table->foreign('cur_esp_id')->references('esp_id')->on('esports');
            $table->foreign('cur_est_id')->references('est_id')->on('estats_cursa');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curses');
    }
};
