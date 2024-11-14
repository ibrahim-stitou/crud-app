<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beneficier extends Model
{
    use HasFactory;
    protected $fillable=['nom','prenom','telephone','ville_id','date_naissnace','adresse','niveau_id','ecole_id','pere_membre','mere_membre'];

    public function activites(){
        return $this->belongsToMany(Activite::class,'activite_beneficier','beneficier_id','activite_id');
    }

    public function ville(){
        return $this->belongsTo(Ville::class);
    }

    public function notes()
    {
        return $this->morphMany(Note::class, 'notable');
    }

}
