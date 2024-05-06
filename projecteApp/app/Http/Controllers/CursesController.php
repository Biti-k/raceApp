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
        
        dd($request->all());


        
    }
}
