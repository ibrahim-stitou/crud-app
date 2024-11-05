<?php

namespace App\Http\Controllers;

use App\Models\Ville;
use Illuminate\Http\Request;

class villeController extends Controller
{
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

        $ville = Ville::create($request->only(['nom_ville']));
        return response()->json($ville, 201); // Return the created city with a 201 status
    }

    public function destroy($id)
    {
        // Delete the city
        $ville = Ville::find($id);
        if (!$ville) {
            return response()->json(['error' => 'unfounded city'], 404);
        }
        $ville->delete();
        return response()->json(['message' => 'city deleted successfully'], 301); 
    }
}
