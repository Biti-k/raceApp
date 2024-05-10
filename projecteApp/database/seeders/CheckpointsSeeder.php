<?php

namespace Database\Seeders;

use App\Models\CheckpointsModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CheckpointsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 0; $i < 6; $i++){
            CheckpointsModel::create([
                "chk_id" => $i+1,
                "chk_pk" => $i+1,
                "chk_cir_id" => 1
            ]);
        }
        for($i = 0; $i < 6; $i++){
            CheckpointsModel::create([
                "chk_id" => ($i+7),
                "chk_pk" => $i+1,
                "chk_cir_id" => 2
            ]);
        }
    }
}
