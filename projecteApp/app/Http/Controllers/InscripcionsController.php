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
        return InscripcionsModel::getWithRelations($request->all());
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

        $lastInscripcion = InscripcionsModel::where("ins_ccc_id", $inscripcioData["ins_ccc_id"])->orderBy('ins_dorsal', 'desc')->first();

        $inscripcio = InscripcionsModel::create([
            'ins_par_id' => $participant->par_id,
            'ins_data' => DB::raw("NOW()"),
            'ins_dorsal' => $lastInscripcion != null ? $lastInscripcion->ins_dorsal + 1 : 1,
            "ins_ccc_id" => $inscripcioData["ins_ccc_id"],
        ]);
        return response()->json(
            [
                "new_inscripcio" => InscripcionsModel::with(['participant'])->find($inscripcio->ins_id)
            ]
        );
    }

    public function stateInscripcio (Request $request)
    {
        $data = $request->all();
        dd($data);
        if($data['state'] == 'participa'){

        }else if($data['state'] == 'retirat'){
            //$inscripcio = InscripcionsModel::where('ins_id', )
        }
    }
}
