<?php

namespace Database\Factories;

use App\Models\Activite;
use App\Models\Beneficier;
use App\Models\Ville;
use Illuminate\Database\Eloquent\Factories\Factory;

class ActiviteFactory extends Factory
{
    protected $model = Activite::class;

    public function definition()
    {
        return [
            'titre' => $this->faker->sentence, // Random activity title
            'ville_id' => $this->faker->numberBetween(1, 20), // Random city ID between 1 and 20
            'date_activite' => $this->faker->dateTimeBetween('now', '+1 year'), // Random date within the next year
        ];
    }

    // Optionally, you can create an accessor for the pivot table if you want to associate beneficiaries
    public function withBeneficiers()
    {
        return $this->afterCreating(function (Activite $activite) {
            // Attach random beneficiaries with IDs between 1 and 50
            $beneficierIds = $this->faker->unique()->randomElements(Beneficier::pluck('id')->toArray(), 3); // Choose 3 random beneficiaries
            $activite->beneficiers()->attach($beneficierIds);
        });
    }
}
