<?php

namespace Database\Seeders;

use App\Models\InscripcionsModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InscripcionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InscripcionsModel::create([
          "ins_par_id" => 1,
          "ins_data" => "2024-05-25",
          "ins_dorsal" => 2,
          'ins_bea_id' => 1,
          "ins_ccc_id" => 1
        ]);
        InscripcionsModel::create([
          "ins_par_id" => 2,
          "ins_data" => "2024-05-25",
          "ins_dorsal" => 3,
          'ins_bea_id' => 2,
          "ins_ccc_id" => 1
        ]);
    }
}
