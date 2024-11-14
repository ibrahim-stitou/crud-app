<?php

namespace Database\Factories;

use App\Models\Intervenant;
use App\Models\Ville; // Assuming you have a Ville model
use Illuminate\Database\Eloquent\Factories\Factory;

class IntervenantFactory extends Factory
{
    protected $model = Intervenant::class;

    public function definition()
    {
        return [
            'nom' => $this->faker->lastName,
            'prenom' => $this->faker->firstName,
            'telephone' => $this->faker->phoneNumber,
            'membre' => $this->faker->boolean,
            'function' => $this->faker->word,
            'ville_id' => Ville::factory(),
            'specialite' => $this->faker->word,
        ];
    }
}
