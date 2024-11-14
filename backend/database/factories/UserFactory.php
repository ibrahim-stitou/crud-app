<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'prenom' => $this->faker->firstName,
            'specialite' => $this->faker->word,
            'date_naissance' => $this->faker->date(),
            'niveau_etude' => $this->faker->word,
            'can_login' => $this->faker->boolean,
            'password' => bcrypt('password'),  // Default password
            'email_verified_at' => $this->faker->dateTime(),
        ];
    }

    /**
     * Create an unverified user
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
