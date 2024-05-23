<?php

namespace App\Http\Controllers;

use App\Models\RegistresModel;
use Illuminate\Http\Request;

class RegistresController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return RegistresModel::getWithRelations($request->all());
    }
    public function store(Request $request)
    {
        $data = $request->all();

        $registre = RegistresModel::create($data);

        return response()->json(['registre' => $registre]);
    }
}
