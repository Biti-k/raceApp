<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistresModel extends Model
{
    use HasFactory;
    
    protected $table = 'registres';
    protected $primaryKey = 'reg_id';
    protected $fillable = ['reg_id','reg_ins_id','reg_chk_id','reg_temps'];

    public function inscripcio()
    {
        return $this->belongsTo(InscripcionsModel::class, 'reg_ins_id');
    }
    public function checkpoint()
    {
        return $this->belongsTo(CheckpointsModel::class, 'reg_chk_id');
    }


    public static function getWithRelations($params = null)
    {

        if(isset($params['reg_ins_id'])){
            $registres = self::where('reg_ins_id', $params['reg_ins_id'])->with(['inscripcio', 'checkpoint'])->get();
        }else if(isset($params['reg_id'])){
            $registres = self::with(['inscripcio.participant', 'checkpoint'])->find($params['reg_ins_id']);
            return $registres;
        }else{
            $registres = self::with(['inscripcio', 'checkpoint'])->get();
        }
        
        return response()->json([
            'registres' => $registres,
        ]);
    }


}
