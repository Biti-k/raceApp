<?php

namespace App\Http\Controllers;

use App\Models\CheckpointsModel;
use Illuminate\Http\Request;

class CheckpointsController extends Controller
{
    //

    public function getAll(Request $request)
    {
        return CheckpointsModel::getWithRelations();
    }
}
