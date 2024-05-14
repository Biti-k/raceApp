<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InscripcionsModel extends Model
{
    use HasFactory;

    protected $table = 'inscripcions';
    protected $primaryKey = 'ins_id';
    protected $fillable = ['ins_id','ins_par_id','ins_data','ins_dorsal','ins_retirat','ins_bea_id','ins_ccc_id'];

    public function participant()
    {
        return $this->belongsTo(ParticipantsModel::class, 'ins_par_id');
    }
    
    public function beacons(){
        return $this->belongsTo(BeaconsModel::class, 'ins_bea_id');
    }

    public static function getWithRelations($params = null)
    {
        $inscripcions = null;
        if(isset($params['cur_id'])){
            $cir_ids = CircuitsModel::where('cir_cur_id', $params['cur_id'])->pluck('cir_id')->toArray();
            $ccc_ids = CircuitsCategoriesModel::whereIn('ccc_cir_id', $cir_ids)->pluck('ccc_id')->toArray();
            $inscripcions = InscripcionsModel::with(['participant', 'beacons'])->whereIn('ins_ccc_id', $ccc_ids)->get();
        }else{
            $inscripcions = self::with(['participant', 'beacons'])->get();
        }
        
        return response()->json([
            'inscripcions' => $inscripcions,
        ]);
    }

}
