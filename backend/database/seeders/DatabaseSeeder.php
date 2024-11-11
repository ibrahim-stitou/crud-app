<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\BeneficierFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'ibrahim stitou',
            'email' => 'stitou.brahim.stitou@gmail.com',
            'password'=>bcrypt('stitou2002')
        ]);
        BeneficierFactory::factory()->create();
    }
}
