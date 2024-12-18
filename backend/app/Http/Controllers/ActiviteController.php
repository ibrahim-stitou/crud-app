<?php
namespace App\Http\Controllers;

use App\Models\Activite;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ActiviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activites = Cache::remember("activites",60,function(){
            return Activite::with("ville")->get();
        });
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
            'date_activite' => 'required|date',
            'beneficier_id' => 'nullable|exists:beneficiers,id', // Optional, for attaching
        ]);


        $activite = Activite::create($request->only(['titre', 'ville_id', 'date_activite']));

        // Attach beneficiary if provided
        if ($request->has('beneficier_id')) {
            $activite->beneficiers()->attach($request->beneficier_id);
        }
        Cache::forget("activites");
        return response()->json($activite, 201); 
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Find the activity by ID, including the related 'ville' and 'beneficiers'
        $activite = Cache::remember("activite_{$id}",60,function()use($id){
           return  Activite::with(['ville', 'beneficiers'])->where('id', $id)->first();
        });
        
        if (!$activite) {
            return response()->json(["error" => "Activité non trouvée"], 404);
        }

        
        return response()->json($activite);
    }   
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the activity by ID
        $activite = Activite::find($id);

        if (!$activite) {
            return response()->json(["error" => "Activité non trouvée"], 404);
        }
        $request->validate([
            'titre' => 'required|string|max:255',
            'ville_id' => 'required|exists:villes,id',
            'date_activite' => 'required|date',
        ]);

        // Update the activity
        $activite->update($request->only(['titre', 'ville_id', 'date_activite'])); 
        Cache::forget("activites");
        Cache::forget("activite_{$id}");
        return response()->json($activite); 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Find the activity by ID
        $activite = Activite::find($id);

        if (!$activite) {
            return response()->json(['error' => 'Activité non trouvée'], 404);
        }

        // Detach beneficiaries if any
        if ($activite->beneficiers()->exists()) {
            $activite->beneficiers()->detach();
        }

        // Delete the activity
        $activite->delete();

        return response()->json(['message' => 'Activité supprimée avec succès'], 200); // Use 200 for success response
    }
}
