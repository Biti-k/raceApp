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
        Schema::create('registres', function (Blueprint $table) {
            $table->unsignedBigInteger('reg_id')->autoIncrement();
            $table->unsignedBigInteger("reg_ins_id");
            $table->unsignedBigInteger("reg_chk_id");
            $table->dateTime("reg_temps");
            $table->foreign('reg_ins_id')->references('ins_id')->on('inscripcions');
            $table->foreign('reg_chk_id')->references('chk_id')->on('checkpoints');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('registres');
    }
};
