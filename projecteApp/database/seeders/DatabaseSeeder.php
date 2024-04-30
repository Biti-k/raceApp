<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->Call(EstatsCursaSeeder::class);
        $this->Call(BeaconSeeder::class);
        $this->Call(EsportsSeeder::class);
        $this->Call(CategoriasSeeder::class);
        $this->Call(ParticipantsSeeder::class);
        $this->Call(CursesSeeder::class);
        $this->Call(CircuitsSeeder::class);
        $this->Call(CircuitsCategoriesSeeder::class);
    }
}
