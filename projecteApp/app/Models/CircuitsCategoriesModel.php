<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CircuitsCategoriesModel extends Model
{
    use HasFactory;

    protected $table = 'circuits_categories';
    protected $primaryKey = 'ccc_id';
    protected $fillable = ['ccc_id','ccc_cat_id','ccc_cir_id'];

    public function circuit ()
    {
        return $this->belongsTo(CircuitsModel::class, 'ccc_cir_id');
    }

    public function categoria ()
    {
        return $this->belongsTo(CategoriesModel::class, 'ccc_cat_id');
    }

    public function inscripcions ()
    {
        return $this->hasMany(InscripcionsModel::class, 'ins_ccc_id');
    }

    public static function getWithRelations($params = null)
    {
        $circuit_categoria = [];

        if(isset($params['cat_id']) && isset($params['cir_id'])){
            $ccc_id = self::where('ccc_cat_id', $params['cat_id'])->where('ccc_cir_id', $params['cir_id'])->first();
            if($ccc_id != null){
                return response()->json([
                    'inscripcions' => InscripcionsModel::with(['participant', 'registres'])->where('ins_ccc_id', $ccc_id->ccc_id)->get(),
                ]);
            }else{
                return response()->json([
                    'inscripcions' => [],
                ]);
            }
        }else{
            $circuit_categoria = self::with(['circuit','categoria','inscripcions'])->get();
        }
        
        return response()->json([
            'circuit_categoria' => $circuit_categoria,
        ]);
    }

}
