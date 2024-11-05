<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beneficier extends Model
{
    use HasFactory;
    protected $fillable=['nom','prenom','email','telephone','ville_id'];
    
    public function activites(){
        return $this->belongsToMany(Activite::class,'activite_beneficier');
    }

    public function ville(){
        return $this->belongsTo(Ville::class);
    }

}
