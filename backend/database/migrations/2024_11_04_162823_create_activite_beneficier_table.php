<?php

// database/migrations/xxxx_xx_xx_create_activite_beneficiaire_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activite_beneficier', function (Blueprint $table) {
            $table->id();
            $table->foreignId('activite_id')->constrained('activites')->onDelete('cascade'); 
            $table->foreignId('beneficier_id')->constrained('beneficiers')->onDelete('cascade');  // Foreign key to beneficiaires
            $table->timestamps();
        }); 
    }

    public function down(): void
    {
        Schema::dropIfExists('activite_beneficier');
    }
};
