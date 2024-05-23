<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class LoginController extends Controller
{
    public function checkLogin(Request $request){
        $user = User::firstWhere('email', $request->input("email"));
        if(!$user){
            return response()->json([
                'mensaje' => "No existeix aquest usuari",
                "resultado" => -1,
            ]);
        }
        if($user && Hash::check($request->input("password"), $user->password)){
            return response()->json(
                [
                    "resultado" => 1
                ]
            );
        }else{
            return response()->json(
                [
                    "resultado" => -2,
                    "mensaje" => "Contrasenya incorrecte",
                ]
            );   
        }
    }
}
