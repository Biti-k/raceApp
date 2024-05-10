<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CircuitsModel extends Model
{
    use HasFactory;
    protected $primaryKey = "cir_id";
    protected $table = "circuits";
    protected $fillable = ['cir_id','cir_cur_id','cir_num','cir_distancia','cir_nom','cir_preu','cir_temps_estimat'];

    public function curses(){
        return $this->belongsTo(CursesModel::class, "cir_cur_id");
    }

    public function checkpoints(){
        return $this->hasMany(CheckpointsModel::class, "chk_id");
    }

    public function categories(){
        return $this->hasMany(CircuitsCategoriesModel::class, "ccc_cir_id");
    }

    public static function getWithRelations($params = null)
    {
        $circuits = self::with(['curses', 'checkpoints'])->get();
        
        return response()->json([
            'circuits' => $circuits,
        ]);
    }
}
