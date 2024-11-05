<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    use HasFactory;
    protected $fillable=['titre','ville_id','beneficier_id','date_acivite'];

    public function beneficiers(){
        return $this->hasMany(Beneficier::class);
    }
    public function  ville(){
        return $this->belongsTo(Ville::class);
    }   
    
}
