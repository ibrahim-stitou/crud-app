<?php
namespace App\Http\Controllers;

use App\Models\Beneficier;
use Illuminate\Http\Request;

class BeneficierController extends Controller
{
    // Display a listing of the beneficiaries.
    public function index()
    {
        $beneficiers = Beneficier::all();
        return response()->json($beneficiers, 200);
    }

    /**
     * Store a newly created beneficiary in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "nom" => 'required|string|max:255',
            "prenom" => 'required|string|max:255',
            "email" => 'required|email|unique:beneficiers,email',
            "telephone" => 'required|string|max:12',
            "ville_id" => 'required|exists:villes,id',
           
        ]);

        // Create the beneficiary
        $beneficier = Beneficier::create($request->only(['nom', 'prenom', 'email', 'telephone', 'ville_id']));

        // Attach activities if provided
        if ($request->has('activite_id')) {
            $beneficier->activites()->attach($request->activite_id);
        }

        return response()->json([
            'message' => 'Bénéficiaire ajouté avec succès',
            'beneficier' => $beneficier
        ], 201);
    }

    /**
     * Display the specified beneficiary.
     */
    public function show($id)
    {
        // Find the beneficiary by ID
        $beneficier = Beneficier::with(['ville','activites'])->where('id',$id)->first();
        
        if (!$beneficier) {
            return response()->json(["error" => "Ce bénéficiaire n'existe pas !"], 404);
        }

        return response()->json($beneficier, 200);
    }

    /**
     * Update the specified beneficiary in storage.
     */
    public function update(Request $request, $id)
    {
        // Find the beneficiary by ID
        $beneficier = Beneficier::find($id);

        if (!$beneficier) {
            return response()->json(["error" => "Bénéficiaire introuvable !"], 404);
        }

        $request->validate([
            "nom" => 'required|string|max:255',
            "prenom" => 'required|string|max:255',
            "telephone" => 'required|string|max:12',
            "ville_id" => 'required|exists:villes,id',
        ]);

        // Update the beneficiary
        $beneficier->update($request->only(['nom', 'prenom', 'telephone', 'ville_id']));

        return response()->json([
            "message" => "Bénéficiaire mis à jour avec succès",
            "beneficier" => $beneficier,
        ], 200);
    }

    /**
     * Remove the specified beneficiary from storage.
     */
    public function destroy($id)
    {
        // Find the beneficiary by ID
        $beneficier = Beneficier::find($id);

        if (!$beneficier) {
            return response()->json(['error' => 'Bénéficiaire introuvable'], 404);
        }

        // Detach activities before deleting the beneficiary
        $beneficier->activites()->detach();
        $beneficier->delete();

        return response()->json(['message' => 'Bénéficiaire supprimé avec succès'], 200);
    }

    public function getActivites($id)
    {
        
        $beneficier = Beneficier::with(['activites','ville'])->where('id',$id)->first();
        
        if (!$beneficier) {
            return response()->json(["error" => "Ce bénéficiaire n'existe pas !"], 404);
        }

        $activites = $beneficier->activites;

        return response()->json($activites, 200);
    }


}
