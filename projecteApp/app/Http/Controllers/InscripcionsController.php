<?php

namespace App\Http\Controllers;

use App\Models\InscripcionsModel;
use Illuminate\Http\Request;

class InscripcionsController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return InscripcionsModel::getWithRelations();
    }
}
