<?php

namespace Database\Seeders;

use App\Models\EstatsCursaModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstatsCursaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        EstatsCursaModel::create(['est_id' => 1,'est_nom'=> 'En Preparació']);
        EstatsCursaModel::create(['est_id' => 2,'est_nom'=> 'Inscripció Oberta']);
        EstatsCursaModel::create(['est_id' => 3,'est_nom'=> 'Inscripció Tancada']);
        EstatsCursaModel::create(['est_id' => 4,'est_nom'=> 'En Curs']);
        EstatsCursaModel::create(['est_id' => 5,'est_nom'=> 'Finalitzada']);
        EstatsCursaModel::create(['est_id' => 6,'est_nom'=> 'Cancelada']);
    }
}
