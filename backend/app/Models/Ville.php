<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    use HasFactory;
    protected $fillable=['nom_ville'];
    public function beneficiers(){
        return $this->hasMany(Beneficier::class);
    }

    public function activites(){
        return $this->hasMany(Activite::class);
    }
}
