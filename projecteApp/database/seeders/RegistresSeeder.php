<?php

namespace Database\Seeders;

use App\Models\RegistresModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegistresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RegistresModel::create([
            "reg_ins_id" => 1,
            "reg_chk_id" => 1,
            "reg_temps" => "2024-05-25 19:30:02"
        ]);
        RegistresModel::create([
            "reg_ins_id" => 1,
            "reg_chk_id" => 2,
            "reg_temps" => "2024-05-25 20:00:02"
        ]);
        RegistresModel::create([
            "reg_ins_id" => 1,
            "reg_chk_id" => 3,
            "reg_temps" => "2024-05-25 20:40:02"
        ]);

        //

        RegistresModel::create([
            "reg_ins_id" => 2,
            "reg_chk_id" => 1,
            "reg_temps" => "2024-05-25 19:30:53"
        ]);
        RegistresModel::create([
            "reg_ins_id" => 2,
            "reg_chk_id" => 3,
            "reg_temps" => "2024-05-25 19:50:12"
        ]);

    }
}
