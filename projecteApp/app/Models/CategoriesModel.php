<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriesModel extends Model
{
    use HasFactory;
    protected $primaryKey = "cat_id";
    protected $table = "categories";
    protected $fillable = ['cat_id', 'cat_esp_id', "cat_nom"];

    public function esports(){
        return $this->belongsTo(EsportsModel::class, "cat_esp_id");
    }

    public static function getWithRelations($params = null)
    {

        $categories = self::with(["esports"])->get();
        
        //self::find($id);
        //self::where('ins_par_id', $par_id)->where()...->get();

        return response()->json([
            'categories' => $categories,
        ]);
    }
}
