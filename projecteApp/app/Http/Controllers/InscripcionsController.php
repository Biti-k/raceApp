<?php

namespace App\Http\Controllers;

use App\Models\BeaconsModel;
use App\Models\InscripcionsModel;
use App\Models\ParticipantsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InscripcionsController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return InscripcionsModel::getWithRelations();
    }

    public function storeInscripcio(Request $request){
        $data = $request->all();
        $participantData = $data["participant"];
        $inscripcioData = $data["inscripcio"];
        $participant = ParticipantsModel::create([
            "par_nif" => $participantData['par_nif'],
            "par_nom" => $participantData['par_nom'],
            "par_cognoms" => $participantData['par_cognoms'],
            "par_data_naixement" => $participantData['par_data_naixement'],
            "par_telefon" => $participantData['par_telefon'],
            "par_email" => $participantData['par_email'],
            "par_es_federat" => $participantData['par_es_federat']
        ]);

        $lastInscripcion = InscripcionsModel::where("ins_ccc_id", $inscripcioData["ins_ccc_id"])->orderBy('ins_id', 'desc')->first();
        if(!$lastInscripcion){
            $nextBeacon = BeaconsModel::first();
        }else{
            $nextBeacon = BeaconsModel::where("bea_id", ">", $lastInscripcion->ins_bea_id)->first();
        }
        
        $inscripcio = InscripcionsModel::create([
            'ins_par_id' => $participant->par_id,
            'ins_data' => DB::raw("NOW()"),
            'ins_dorsal' => $nextBeacon->bea_id,
            "ins_ccc_id" => $inscripcioData["ins_ccc_id"],
            "ins_bea_id" => $nextBeacon->bea_id,
            "ins_retirat" => null,
        ]);
        return response()->json(
            [
                "new_inscripcio" => $inscripcio
            ]
        );
    }
}
