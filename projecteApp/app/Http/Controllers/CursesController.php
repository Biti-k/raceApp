<?php

namespace App\Http\Controllers;

use App\Models\CursesModel;
use Illuminate\Http\Request;

class CursesController extends Controller
{
    //

    public function getAll(Request $request)
    {
        return CursesModel::getWithRelations();
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
            $cursa->cur_foto = $path;
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


        return response()->json([
            'cursa' => $cursa
        ]);
        
    }
}
