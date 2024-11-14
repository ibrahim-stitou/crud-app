<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ecole extends Model
{
    use HasFactory;
    protected $fillable=["nom_ecole"];

    public function intervenants(){
        return $this->hasMany(Beneficier::class);
    }

}
