<?php

namespace Database\Seeders;

use App\Models\CategoriesModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategoriasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CategoriesModel::create([
            "cat_id" => 1 ,
            "cat_esp_id" => 1,
            "cat_nom" => "Obert"
        ]);

        CategoriesModel::create([
            "cat_id" => 2 ,
            "cat_esp_id" => 1,
            "cat_nom" => "Federat"
        ]);

        CategoriesModel::create([
            "cat_id" => 3 ,
            "cat_esp_id" => 2,
            "cat_nom" => "Obert"
        ]);
        
        CategoriesModel::create([
            "cat_id" => 4 ,
            "cat_esp_id" => 2,
            "cat_nom" => "Federat"
        ]);
    }
}
