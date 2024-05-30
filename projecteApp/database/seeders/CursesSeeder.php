<?php

namespace Database\Seeders;

use App\Models\CursesModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CursesModel::create([
            "cur_id" => 1,
            "cur_nom" => "Tiger Race",
            "cur_data_inici" => '2024-05-10 09:30:00',
            "cur_data_fi" => '2024-05-10 13:30:00',
            "cur_lloc" => "Ronda, Málaga",
            "cur_esp_id" => 1,
            "cur_est_id" => 2,
            "cur_desc" => "La Tiger Race es una emocionante carrera de running que lleva a los participantes a través de un desafiante recorrido diseñado para poner a prueba su resistencia, habilidad y determinación. Esta carrera, inspirada en la fuerza y el espíritu del tigre, ofrece una experiencia única llena de emoción y aventura.",
            "cur_limit_inscr" => 100,
            "cur_foto" => 'cursa1.jpg',
            "cur_web" => ''
        ]);
        CursesModel::create([
            "cur_id" => 2,
            "cur_nom" => "Steel Man",
            "cur_data_inici" => '2024-05-15 09:30:00',
            "cur_data_fi" => '2024-05-15 13:30:00',
            "cur_lloc" => "La Manga, Murcia",
            "cur_esp_id" => 2,
            "cur_est_id" => 2,
            "cur_desc" => "La Steel Man es una carrera de resistencia que desafía a los participantes a superar sus límites físicos y mentales en un entorno desafiante y emocionante. Inspirada en la fortaleza del acero, esta carrera ofrece una experiencia única llena de obstáculos y desafíos diseñados para poner a prueba la fuerza, la resistencia y la determinación de los participantes.",
            "cur_limit_inscr" => 150,
            "cur_foto" => 'cursa2.jpg',
            "cur_web" => ''
        ]);
    }
}
