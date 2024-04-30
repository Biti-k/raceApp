<?php

namespace App\Http\Controllers;

use App\Models\ParticipantsModel;
use Illuminate\Http\Request;

class ParticipantsController extends Controller
{
    //
    public function getAll(Request $request)
    {
        return ParticipantsModel::getWithRelations();
    }
}
