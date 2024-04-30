<?php

namespace App\Http\Controllers;

use App\Models\CategoriesModel;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function getAll(){
        $categories = CategoriesModel::getWithRelations();
        return $categories;
    }

    public function get(Request $request){
        $data = $request->all();
        $categoria = CategoriesModel::find($data["id"]);
        return response()->json([
            'categoria' => $categoria,
        ]);
    }
}
