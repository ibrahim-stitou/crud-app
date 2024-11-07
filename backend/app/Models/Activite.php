<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Activite extends Model
{
    use HasFactory;
    
    protected $fillable = ['titre', 'ville_id', 'date_activite'];

    public function beneficiers()
    {
        // Notez l'ordre des colonnes : 'activite_id', 'beneficier_id'
        return $this->belongsToMany(Beneficier::class, 'activite_beneficier', 'activite_id', 'beneficier_id');
    }

    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }   
}

