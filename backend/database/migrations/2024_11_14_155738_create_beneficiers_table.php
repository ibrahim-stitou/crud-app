<?php

// database/migrations/xxxx_xx_xx_create_beneficiaires_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('beneficiers', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('adresse')->nullable();
            $table->string('telephone')->nullable();
            $table->date('date_naissance')->nullable();
            $table->foreignId('ville_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('niveau_id')->nullable()->constrained('niveaux')->onDelete('cascade');
            $table->foreignId('ecole_id')->nullable()->constrained('ecoles')->onDelete('cascade');
            $table->foreignId('note_id')->nullable()->constrained('notes')->onDelete('cascade');
            $table->boolean('pere_membre')->default(false);
            $table->boolean('mere_mmebre')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beneficiers');
    }
};
