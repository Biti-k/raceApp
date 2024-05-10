<?php

namespace App\Http\Controllers;

use App\Models\CategoriesModel;
use App\Models\CircuitsCategoriesModel;
use App\Models\CircuitsModel;
use App\Models\CursesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CursesController extends Controller
{
    //

    public function getAll(Request $request)
    {
        return CursesModel::getWithRelations();
    }

    public function getCursa (Request $request)
    {
        $data = $request->all();
        
        return CursesModel::getWithRelations($data);
    }

    public function storeCursa(Request $request)
    {
        $data = $request->all();
        $foto = $request->files->all();
        $cursa = json_decode($data['cursa']);
        
        if(count($foto) > 0){
            //$foto['cur_foto']->getClientOriginalName()
            $file = $request->file('cur_foto');
            $path = $file->store('curses');
            $parts = explode('/', $path);
            $lastPart = end($parts);
            $cursa->cur_foto = $lastPart;

        }
        
        $cursa = CursesModel::create([
            'cur_nom' => $cursa->cur_nom,
            'cur_data_inici' => $cursa->cur_data_inici,
            'cur_data_fi' => $cursa->cur_data_fi,
            'cur_lloc' => $cursa->cur_lloc,
            'cur_esp_id' => $cursa->cur_esp_id,
            'cur_est_id' => 1,//En preparacio
            'cur_desc' => $cursa->cur_desc,
            'cur_limit_inscr' => $cursa->cur_limit_inscr,
            'cur_foto' => $cursa->cur_foto,
            'cur_web' => $cursa->cur_web,
        ]);

        $circuits = json_decode($data["circuits"]);
        $circuitsFinals = array();
        foreach($circuits as $c){
          $cCreado = CircuitsModel::create([
            "cir_cur_id" => $cursa->cur_id,
            "cir_num" =>  $c->cir_num,
            "cir_distancia" => $c->cir_distancia,
            "cir_nom" => $c->cir_nom,
            "cir_preu" => $c->cir_preu,
            "cir_temps_estimat" => $c->cir_temps_estimat,
          ]);
          foreach($c->cir_categories as $ccc){
            $cccCreado = CircuitsCategoriesModel::create([
              "ccc_cat_id" => $ccc->value,
              "ccc_cir_id" => $cCreado->cir_id,
            ]);
          }
          $circuitsFinals[] = $cCreado;
        }


        
        return response()->json([
            'cursa' => $cursa,
            "circuits" => $circuitsFinals,
        ]);
        
    }

    public function updateCursa(Request $request)
    {
        $data = $request->all();
    
        $foto = $request->files->all();
        
        $cursa = json_decode($data['cursa']);
        $foto_name = null;
        if(count($foto) > 0){
            //$foto['cur_foto']->getClientOriginalName()
            $file = $request->file('cur_foto');
            $path = $file->store('curses');
            $parts = explode('/', $path);
            $lastPart = end($parts);
            $foto_name = $lastPart;

        }
        
        $cursa_update = CursesModel::find($cursa->cur_id);


        $cursa_update->update([
            'cur_nom' => $cursa->cur_nom,
            'cur_data_inici' => $cursa->cur_data_inici,
            'cur_data_fi' => $cursa->cur_data_fi,
            'cur_lloc' => $cursa->cur_lloc,
            'cur_esp_id' => $cursa->cur_esp_id,
            'cur_est_id' => 1,//En preparacio
            'cur_desc' => $cursa->cur_desc,
            'cur_limit_inscr' => $cursa->cur_limit_inscr,
            'cur_foto' => $foto_name != null ? $foto_name : $cursa_update->cur_foto,
            'cur_web' => $cursa->cur_web,
        ]);
        
        return response()->json([
            'cursa' => $cursa_update
        ]);
        
    }

    public function deleteCursa(Request $request)
    {
        //Comprovar que no tenga elementos asociados!!!!!
        // return response()->json([
        //     'delete' => 0
        // ]);

        $data = $request->all();
        
        CursesModel::where('cur_id', $data['id'])->delete();

        return response()->json([
            'delete' => 1
        ]);
    }

    public function getCursaFormCategories(Request $request){
        $response = CategoriesModel::where("cat_esp_id", $request->get("esp_id"))->get();
        return response()->json([
            "categories" => $response
        ]
        );
    }
}
