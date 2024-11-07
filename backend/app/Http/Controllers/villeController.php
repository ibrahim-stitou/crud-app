<?php
namespace App\Http\Controllers;

use App\Models\Ville;
use Illuminate\Http\Request;

class villeController extends Controller
{
    // Display a listing of the cities.
    public function index()
    {
        $villes = Ville::all();
        return response()->json($villes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom_ville' => 'required|string|max:255',
        ]);

        // Create the city
        $ville = Ville::create($request->only(['nom_ville']));
        
        // Return the created city with a 201 status
        return response()->json($ville, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the city by ID, or return a 404 if not found
        $ville = Ville::find($id);
        if (!$ville) {
            return response()->json(['error' => 'City not found'], 404);
        }

        // Delete the city
        $ville->delete();
        
        // Return a success message with a 200 status
        return response()->json(['message' => 'City deleted successfully'], 200);
    }
}

