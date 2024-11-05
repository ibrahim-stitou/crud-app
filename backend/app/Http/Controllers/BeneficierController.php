<?php

namespace App\Http\Controllers;

use App\Models\Beneficier;
use Illuminate\Http\Request;

class BeneficierController extends Controller
{
    public function index()
    {
        $beneficiers = Beneficier::all();
        return $beneficiers->isEmpty()
            ? response()->json("Aucun bénéficiaire à afficher", 404)
            : response()->json($beneficiers);
    }

    public function store(Request $request)
    {
        $request->validate([
            "nom" => 'required|string|max:255',
            "prenom" => 'required|string|max:255',
            "email" => 'required|email|unique:beneficiers,email',
            "telephone" => 'required|string|max:12',
            "ville_id" => 'required|exists:villes,id'
        ]);

        $beneficier = Beneficier::create($request->all());
        return response()->json(['message' => 'Bénéficiaire ajouté avec succès', 'beneficier' => $beneficier], 200);
    }

    public function show($id)
    {
        $beneficier = Beneficier::find($id);
        return $beneficier
            ? response()->json($beneficier, 200)
            : response()->json(["error" => "Ce bénéficiaire n'existe pas !"], 404);
    }

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

        $beneficier->update($request->all());

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

        $beneficier->delete();
        return response()->json(['message' => 'Bénéficiaire supprimé avec succès'], 200);
    }
}
