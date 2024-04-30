<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CheckpointsModel extends Model
{
    use HasFactory;
    protected $fillable = ['chk_id','chk_pk','cir_id'];
    protected $table = "checkpoints";
    protected $primaryKey = "chk_id";

    public function circuit ()
    {
        return $this->belongsTo(CircuitsModel::class, 'cir_id');
    }

    
    public function registres ()
    {
        return $this->hasMany(RegistresModel::class, 'reg_chk_id');
    }

    public static function getWithRelations($params = null)
    {
        $checkpoints = self::with(['circuit', 'registres'])->get();
        
        return response()->json([
            'checkpoints' => $checkpoints,
        ]);
    }
}
