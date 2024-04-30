<?php

namespace App\Http\Controllers;

use App\Models\CircuitsCategoriesModel;
use Illuminate\Http\Request;

class CircuitsCategoriesController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return CircuitsCategoriesModel::getWithRelations();
    }
}
