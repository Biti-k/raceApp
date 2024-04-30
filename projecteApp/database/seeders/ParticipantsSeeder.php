<?php

namespace Database\Seeders;

use App\Models\ParticipantsModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
class ParticipantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ParticipantsModel::create([
            'par_id' => 1,
            'par_nif' => "43544004J",
            'par_nom' => "Antonio",
            "par_cognoms" => "Sánchez Romero",
            "par_data_naixement" => "1994-04-02",
            "par_telefon" => "693952062",
            "par_email" => "ansaro@gmail.com",
            "par_es_federat" => true
        ]);

        $faker = Faker::create();

        // Crear cuatro registros aleatorios
        $startDate = '-100 years'; // Adjust as needed
        $endDate = '-5 years'; // Adjust as needed

        for ($i = 0; $i < 15; $i++) {
            ParticipantsModel::create([
                'par_id' => $i + 2,
                'par_nif' => $faker->regexify('[0-9]{8}[A-Z]'),
                'par_nom' => $faker->firstName,
                'par_cognoms' => $faker->lastName,
                'par_data_naixement' => $faker->dateTimeBetween($startDate, $endDate)->format('Y-m-d'),
                'par_telefon' => $faker->regexify('[1-9]{1}[0-9]{8}'),
                'par_email' => $faker->email,
                'par_es_federat' => $faker->boolean,
            ]);
        }
    }
}
