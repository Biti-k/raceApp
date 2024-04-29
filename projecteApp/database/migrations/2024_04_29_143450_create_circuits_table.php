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
        Schema::create('circuits', function (Blueprint $table) {
            $table->unsignedBigInteger('cir_id')->autoIncrement();
            $table->unsignedBigInteger('cir_cur_id');
            $table->unsignedBigInteger('cir_num');
            $table->float('cir_distancia', 10,2);
            $table->string('nom', 200);
            $table->float('preu', 19,4);
            $table->integer('cir_temps_estimat')->nullable();
            $table->timestamps();

            $table->foreign('cir_cur_id')->references('cur_id')->on('curses');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circuits');
    }
};
