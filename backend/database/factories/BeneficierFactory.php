<?php

namespace Database\Factories;

use App\Models\Beneficier;
use Illuminate\Database\Eloquent\Factories\Factory;

class BeneficierFactory extends Factory
{
    protected $model = Beneficier::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->firstName,
            'prenom' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'telephone' => $this->faker->phoneNumber,
            'ville_id' => $this->faker->randomElement([1,2,3,4]),
        ];
    }
}
