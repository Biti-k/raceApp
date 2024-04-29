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
        Schema::create('circuits_categories', function (Blueprint $table) {
            $table->unsignedBigInteger('ccc_id')->autoIncrement();
            $table->unsignedBigInteger('ccc_cat_id');
            $table->unsignedBigInteger('ccc_cir_id');
            $table->timestamps();

            $table->foreign('ccc_cir_id')->references('cir_id')->on('circuits');
            $table->foreign('ccc_cat_id')->references('cat_id')->on('categories');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('circuits_categories');
    }
};
