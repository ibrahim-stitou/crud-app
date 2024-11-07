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
            $table->string('email')->unique()->nullable();
            $table->string('telephone')->nullable();
            $table->foreignId('ville_id')->constrained()->onDelete('cascade');  // Ensure foreign key to villes
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('beneficiers');
    }
};
