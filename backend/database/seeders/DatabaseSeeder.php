<?php

namespace Database\Seeders;

use App\Models\Activite;
use App\Models\User;
use App\Models\Beneficier; // Make sure to import the Beneficier model
use App\Models\Ville;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create an admin user with a specific email and password
        User::factory()->create([
            'name' => 'stitou',
            'email' => 'stitou.brahim.stitou@gmail.com',
            'password' => bcrypt('stitou2002'),
            'prenom'=>"ibrahim"
        ]);

        // Create 50 Beneficier records using the Beneficier factory
        Ville::factory(20)->create();
        Beneficier::factory(50)->create();
        Activite::factory()->count(10)->withBeneficiers()->create();
        User::factory(50)->create();
    }
}
