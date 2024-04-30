<?php

namespace App\Http\Controllers;

use App\Models\BeaconsModel;
use Illuminate\Http\Request;

class BeaconsController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return BeaconsModel::getWithRelations();
    }
}
