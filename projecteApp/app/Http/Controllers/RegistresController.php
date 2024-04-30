<?php

namespace App\Http\Controllers;

use App\Models\RegistresModel;
use Illuminate\Http\Request;

class RegistresController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return RegistresModel::getWithRelations();
    }
}
