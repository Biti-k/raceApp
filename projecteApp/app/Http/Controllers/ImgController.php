<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImgController extends Controller
{
    public function showImg($nom = null)
    {
        
        
        if($nom != null){

            $path = storage_path('app/curses/'.$nom);
            
            if (!file_exists($path)) {
                abort(404);
            }
            
            return response()->file($path);
        }else{
            dd($nom);
        }
        
    }

}
