<?php

namespace App\Http\Controllers;

use App\Models\CategoriesModel;
use App\Models\CheckpointsModel;
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
          	$km_chek = $cCreado->cir_distancia / (intval($c->cir_checkpoints) != 0 ? intval($c->cir_checkpoints) : 1);

            //check points del circuit
            for($i = 0; $i < $c->cir_checkpoints; $i++){
				CheckpointsModel::create([
					'chk_pk' => $km_chek * ($i+1),
					'chk_cir_id' => $cCreado->cir_id
				]);
            }

			foreach($c->cir_categories as $ccc){
				$cccCreado = CircuitsCategoriesModel::create([
					"ccc_cat_id" => $ccc->cat_id,
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
        $circuits_new = json_decode($data['circuits']);
       
        $circuits_old = CircuitsModel::where('cir_cur_id', $cursa->cur_id)->get();

        foreach($circuits_old as $cir_old){
            $delete = true;
            foreach($circuits_new as $cir_new){
                if($cir_old->cir_id == $cir_new->cir_id){
                    $delete = false;
                }
            }
            if($delete){
                CircuitsModel::where('cir_id', $cir_old->cir_id)->delete();
            }
        }

        foreach($circuits_new as $cir){
            
            if($cir->cir_id == null){
                $circu = CircuitsModel::create([
                    'cir_num'=> $cir->cir_num,
                    'cir_nom'=> $cir->cir_nom,
                    'cir_distancia'=> $cir->cir_distancia,
                    'cir_temps_estimat'=> $cir->cir_temps_estimat,
                    'cir_preu'=> $cir->cir_preu,
                    'cir_cur_id' => $cursa->cur_id,
                ]);

                //categories del circuit
                foreach($cir->cir_categories as $cat){
                    
                    CircuitsCategoriesModel::create([
                        'ccc_cat_id' => $cat->cat_id,
                        'ccc_cir_id' =>  $circu->cir_id,
                    ]);
                }

                $km_chek = $circu->cir_distancia / (intval($cir->cir_checkpoints) != 0 ? intval($cir->cir_checkpoints) : 1);

                //check points del circuit
                for($i = 0; $i < $cir->cir_checkpoints; $i++){
                    CheckpointsModel::create([
                        'chk_pk' => $km_chek * ($i+1),
                        'chk_cir_id' => $circu->cir_id
                    ]);
                }


            }else{
                
                CircuitsModel::where('cir_id', $cir->cir_id)->update([
                    'cir_num'=> $cir->cir_num,
                    'cir_nom'=> $cir->cir_nom,
                    'cir_distancia'=> $cir->cir_distancia,
                    'cir_temps_estimat'=> $cir->cir_temps_estimat,
                    'cir_preu'=> $cir->cir_preu,
                    'cir_cur_id' => $cursa->cur_id,
                ]);
                
                CircuitsCategoriesModel::where('ccc_cir_id',$cir->cir_id)->delete();
                foreach($cir->cir_categories as $cat){
                
                    CircuitsCategoriesModel::create([
                        'ccc_cat_id' => $cat->cat_id,
                        'ccc_cir_id' =>  $cir->cir_id,
                    ]);
                }

                CheckpointsModel::where('chk_cir_id',$cir->cir_id)->delete();

                $km_chek = $cir->cir_distancia / (intval($cir->cir_checkpoints) != 0 ? intval($cir->cir_checkpoints) : 1);
                //check points del circuit
                for($i = 0; $i < $cir->cir_checkpoints; $i++){
                    CheckpointsModel::create([
                        'chk_pk' => $km_chek * ($i+1),
                        'chk_cir_id' => $cir->cir_id
                    ]);
                }
            }
        }


        

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
        
        $cir_ids = CircuitsModel::where('cir_cur_id', $data['id'])->select('cir_id')->get();

        foreach ($cir_ids as $id){
            CircuitsCategoriesModel::where('ccc_cir_id', $id->cir_id)->delete();
        }
        
        CircuitsModel::where('cir_cur_id', $data['id'])->delete();
        
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

    public function ChangeStateCursa (Request $request)
    {
        $data = $request->all();
        CursesModel::where('cur_id', $data['cur_id'])->update(['cur_est_id' => $data['state']]);
        $cursa = CursesModel::find($data['cur_id']);
        return response()->json(['cursa' => $cursa]);
    }
}
