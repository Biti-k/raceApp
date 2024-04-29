<?php

namespace Database\Seeders;

use App\Models\EsportsModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EsportsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EsportsModel::create([
            "esp_nom" => "Ciclismo" 
        ]);
        EsportsModel::create([
            "esp_nom" => "Running" 
        ]);
        
    }
}
