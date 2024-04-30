<?php

namespace App\Http\Controllers;

use App\Models\EsportsModel;
use Illuminate\Http\Request;

class EsportsController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return EsportsModel::getWithRelations();
    }
}
