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
        $registre = RegistresModel::create(
            [
                "reg_ins_id" => $request->input("reg_ins_id"),
                "reg_chk_id" => $request->input('reg_chk_id'),
                "reg_temps" => $request->input('reg_temps'),
            ]
        );

        return response()->json(['registre' => RegistresModel::getWithRelations(['reg_id' => $registre->reg_id])]);
    }
}
