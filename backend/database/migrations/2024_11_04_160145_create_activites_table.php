<?php

// database/migrations/xxxx_xx_xx_create_activites_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('activites', function (Blueprint $table) {
            $table->id();
            $table->string('titre');
            $table->foreignId('ville_id')->constrained()->onDelete('cascade');  // Ensure foreign key to villes
            $table->date('date_activite');  // Fixed the typo for "date_activite"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('activites');
    }
};
