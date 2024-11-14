<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervenant extends Model
{
    use HasFactory;
    protected $fillable=["nom","prenom","membre","telephone","function","ville","specialite"];
    public function notes()
    {
        return $this->morphMany(Note::class, 'notable');
    }

    public function ville(){
        return $this->belongsTo(Ville::class);
    }

    public function ecole(){
        return $this->belongsTo(Ecole::class);
    }

    public function niveau(){
        return $this->belongsTo(Niveau::class);
    }

}
