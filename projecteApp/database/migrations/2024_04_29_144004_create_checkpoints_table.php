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
        Schema::create('checkpoints', function (Blueprint $table) {
            $table->unsignedBigInteger('chk_id')->autoIncrement();
            $table->float("chk_pk", 10,2)->nullable();
            $table->unsignedBigInteger("chk_cir_id");
            $table->foreign('chk_cir_id')->references('cir_id')->on('circuits');
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
        Schema::dropIfExists('checkpoints');
    }
};
