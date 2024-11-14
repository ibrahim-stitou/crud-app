<?php
use App\Models\Note;
use App\Models\Beneficier;
use App\Models\User;
use App\Models\Intervenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class NoteFactory extends Factory
{
    protected $model = Note::class;

    public function definition()
    {
        // Define random entities for the notable_type
        $notableTypes = [
            Beneficier::class,
            User::class,
            Intervenant::class,
        ];

        return [
            'contenu' => $this->faker->sentence,
            'notable_id' => fn () => $notableTypes[array_rand($notableTypes)]::factory(),
            'notable_type' => $this->faker->randomElement($notableTypes),
        ];
    }
}
