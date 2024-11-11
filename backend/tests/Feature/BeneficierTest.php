<?php

namespace Tests\Feature;

use App\Models\Beneficier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BeneficierTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_can_get_all_beneficiers()
    {
        Beneficier::factory()->count(3)->create();

        $response = $this->getJson('/api/beneficiaires');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function test_can_create_beneficier()
    {
        // Créez un utilisateur de test
        $user = User::factory()->create([
            'email' => 'stitou.brahim.stitou@gmail.com',
            'password' => bcrypt('stitou2002'),
        ]);
    
        // Générez un token JWT pour cet utilisateur
        $token = auth()->login($user);
    
        $data = [
            'nom' => 'John',
            'prenom' => 'Doe',
            'email' => 'john.doe@example.com',
            'telephone' => '123456789',
            'ville_id' => 1,
        ];
    
        $response = $this->postJson('/api/beneficiers', $data, [
            'Authorization' => "Bearer $token"
        ]);
    
        $response->assertStatus(201)
                 ->assertJsonFragment(['nom' => 'John']);
        $this->assertDatabaseHas('beneficiers', ['email' => 'john.doe@example.com']);
    }
    

    public function test_can_show_beneficier()
    {
        $beneficier = Beneficier::factory()->create();

        $response = $this->getJson("/api/beneficiers/{$beneficier->id}");

        $response->assertStatus(200)
            ->assertJson(['id' => $beneficier->id]);
    }



    public function test_can_update_beneficier()
    {
        $beneficier = Beneficier::factory()->create();

        $data = [
            'nom' => 'Jane',
            'prenom' => 'Doe',
            'telephone' => '987654321',
            'ville_id' => 2,
        ];

        $response = $this->putJson("/api/beneficiers/{$beneficier->id}", $data);

        $response->assertStatus(200)
            ->assertJsonFragment(['nom' => 'Jane']);
        $this->assertDatabaseHas('beneficiers', ['nom' => 'Jane']);
    }




    public function test_can_delete_beneficier()
    {
        $beneficier = Beneficier::factory()->create();
    
        $response = $this->deleteJson("/api/beneficiers/{$beneficier->id}");
    
        $response->assertStatus(200)
                 ->assertJson(['message' => 'Bénéficiaire supprimé avec succès']);
        $this->assertDatabaseMissing('beneficiers', ['id' => $beneficier->id]);
    }
    }
