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
        Schema::create('participants', function (Blueprint $table) {
            $table->unsignedBigInteger("par_id")->autoIncrement();  
            $table->string("par_nif", 9);
            $table->string("par_nom", 50);
            $table->string("par_cognoms", 50);
            $table->date("par_data_naixement");
            $table->string("par_telefon", 20);
            $table->string("par_email", 200);
            $table->boolean("par_es_federat");
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
        Schema::dropIfExists('participants');
    }
};
