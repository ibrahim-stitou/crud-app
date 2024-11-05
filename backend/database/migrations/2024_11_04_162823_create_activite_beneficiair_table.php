<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activite_beneficiaire', function (Blueprint $table) {
            $table->id();
            // Ensure these columns match the names in the referenced tables
            $table->foreignId('beneficier_id')->constrained('beneficiers')->onDelete('cascade'); 
            $table->foreignId('activite_id')->constrained('activites')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activite_beneficiaire');
    }
};
