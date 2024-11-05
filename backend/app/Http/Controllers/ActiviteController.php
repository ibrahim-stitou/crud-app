<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activites = Activite::all();
        return response()->json($activites);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'titre' => 'required|string|max:255', 
            'ville_id' => 'required|exists:villes,id', 
            'date_acivite' => 'required|date', 
            'beneficier_id' => 'sometimes|exists:beneficiers,id', // Optional, for attaching
        ]);

        // Create a new activity
        $activite = Activite::create($request->all());
        if ($request->has('beneficier_id')) {
            $activite->beneficiers()->attach($request->beneficier_id);
        }

        return response()->json($activite, 201); 
    }

    /**
     * Display the specified resource.
     */
    public function show(Activite $activite)
    {
        return response()->json($activite); 
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Activite $activite)
    {
        // Validate the incoming request
        $request->validate([
            'titre' => 'required|string|max:255',
            'ville_id' => 'required|exists:villes,id', 
            'date_acivite' => 'required|date', 
        ]);

        // Update the activity
        $activite->update($request->only('titre', 'ville_id', 'date_acivite')); 

        return response()->json($activite); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Activite $activite)
    {   
        $activite->beneficiers()->detach();
        $activite->delete();

        return response()->json(null, 204); 
    }
}
