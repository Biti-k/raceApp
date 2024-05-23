<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class LoginController extends Controller
{
    public function checkLogin(Request $request){
        $user = User::firstWhere('name', $request->input("user"));
        if(!$user){
            return response()->json([
                'mensaje' => "No existeix aquest usuari",
                "resultado" => -1,
            ]);
        }
        if($user && $user->password == $request->input("password")){
            $token = $user->createToken('auth_token')->plainTextToken;
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
