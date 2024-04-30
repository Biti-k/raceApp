<?php

namespace App\Http\Controllers;

use App\Models\EstatsCursaModel;
use Illuminate\Http\Request;

class EstatsCursaController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return EstatsCursaModel::getWithRelations();
    }
}
