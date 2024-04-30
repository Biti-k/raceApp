<?php

namespace App\Http\Controllers;

use App\Models\CircuitsModel;
use Illuminate\Http\Request;

class CircuitsController extends Controller
{
    //

    public function getAll(Request $request)
    {
        return CircuitsModel::getWithRelations();
    }
}
