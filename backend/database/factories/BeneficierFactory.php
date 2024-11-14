<?php

namespace Database\Factories;

use App\Models\Beneficier;
use App\Models\Ville;
use Illuminate\Database\Eloquent\Factories\Factory;

class BeneficierFactory extends Factory
{
    protected $model = Beneficier::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->firstName,
            'prenom' => $this->faker->lastName,
           'telephone' => $this->faker->numerify('###########'),
            'ville_id' => Ville::factory(),
        ];
    }
}
