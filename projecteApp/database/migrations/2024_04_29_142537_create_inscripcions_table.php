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
        Schema::create('inscripcions', function (Blueprint $table) {
            $table->unsignedBigInteger("ins_id")->autoIncrement();
            $table->unsignedBigInteger("ins_par_id");
            $table->date("ins_data");
            $table->integer("ins_dorsal");
            $table->boolean("ins_retirat");
            $table->unsignedBigInteger("ins_bea_id");
            $table->unsignedBigInteger("ccc_id");
            //fks
            $table->foreign('ins_par_id')->references('par_id')->on('participants');
            $table->foreign('ins_bea_id')->references('bea_id')->on('beacons');
            $table->foreign('ccc_id')->references('ccc_id')->on('circuits_categories');
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
        Schema::dropIfExists('inscripcions');
    }
};
