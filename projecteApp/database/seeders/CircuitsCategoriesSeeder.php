<?php

namespace Database\Seeders;

use App\Models\CircuitsCategoriesModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CircuitsCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CircuitsCategoriesModel::create(
            [
                "ccc_id" => 1,
                "ccc_cat_id" => 1,
                "ccc_cir_id" => 1
            ]
        );
        CircuitsCategoriesModel::create(
            [
                "ccc_id" => 2,
                "ccc_cat_id" => 2,
                "ccc_cir_id" => 1
            ]
        );
        CircuitsCategoriesModel::create(
            [
                "ccc_id" => 3,
                "ccc_cat_id" => 3,
                "ccc_cir_id" => 2
            ]
        );
        CircuitsCategoriesModel::create(
            [
                "ccc_id" => 4,
                "ccc_cat_id" => 4,
                "ccc_cir_id" => 2
            ]
        );
    }
}
