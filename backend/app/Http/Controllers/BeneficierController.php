<?php

namespace App\Http\Controllers;

use App\Models\Beneficier;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class BeneficierController extends Controller
{
    public function index()
    {

        $beneficiers = Cache::remember('beneficiers', 60, function () {
            return Beneficier::get();
        });

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

        $beneficier = Beneficier::create($request->only(['nom', 'prenom', 'email', 'telephone', 'ville_id']));


        if ($request->has('activite_id')) {
            $beneficier->activites()->attach($request->activite_id);
        }

      
        Cache::forget('beneficiers');

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
        // Vérifiez d'abord si le bénéficiaire est en cache
        $beneficier = Cache::remember("beneficier_{$id}", 60, function () use ($id) {
            return Beneficier::with(['ville', 'activites'])->find($id);
        });

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

        $beneficier->update($request->only(['nom', 'prenom', 'telephone', 'ville_id']));

      
        Cache::forget('beneficiers');
        Cache::forget("beneficier_{$id}");

        return response()->json([
            "message" => "Bénéficiaire mis à jour avec succès",
            "beneficier" => $beneficier,
        ], 200);
    }

    public function destroy($id)
    {
        $beneficier = Beneficier::find($id);

        if (!$beneficier) {
            return response()->json(['error' => 'Bénéficiaire introuvable'], 404);
        }

        // Détacher les activités avant de supprimer le bénéficiaire
        $beneficier->activites()->detach();
        $beneficier->delete();

        // Effacer le cache des bénéficiaires et du bénéficiaire spécifique
        Cache::forget('beneficiers');
        Cache::forget("beneficier_{$id}");

        return response()->json(['message' => 'Bénéficiaire supprimé avec succès'], 200);
    }

    public function getActivites($id)
    {

        $beneficier = Beneficier::with(['activites', 'ville'])->where('id', $id)->first();

        if (!$beneficier) {
            return response()->json(["error" => "Ce bénéficiaire n'existe pas !"], 404);
        }

        $activites = $beneficier->activites;

        return response()->json($activites, 200);
    }

    public function exportBeneficiers(){
        return Excel::download(new ExportBeneficiers,'beneficiers.xlsx');
    }
}
