<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class CursesModel extends Model
{
    use HasFactory;
    protected $table = 'curses';
    protected $primaryKey = 'cur_id';
    protected $fillable = ['cur_id','cur_nom','cur_data_inici','cur_data_fi','cur_lloc','cur_esp_id','cur_est_id','cur_desc','cur_limit_inscr','cur_foto','cur_web',];

    protected $appends = ['cur_inscrits'];

    public function getCurInscritsAttribute()
    {
        
        return DB::select('SELECT count(*) as count FROM inscripcions where ins_ccc_id in(
            (SELECT ccc_id FROM circuits_categories WHERE ccc_cir_id in(
                (SELECT cir_id FROM circuits WHERE cir_cur_id = '.$this->cur_id.')
            ))
        )')[0]->count;
    }
    public function esport()
    {
        return $this->belongsTo(EsportsModel::class, 'cur_esp_id');
    }

    public function estat()
    {
        return $this->belongsTo(EstatsCursaModel::class, 'cur_est_id');
    }

    public function circuits()
    {
        return $this->hasMany(CircuitsModel::class, 'cir_cur_id');
    }

    public static function getWithRelations($params = null)
    {
        

        if(isset($params['id'])){
            $curses = self::where('cur_id', $params['id'])->with(['esport', 'estat', 'circuits.categories.categoria', 'circuits.categories.inscripcions', 'circuits.checkpoints'])->first();
            return response()->json([
                'cursa' => $curses,
            ]);
            
        }else if(isset($params['est_id'])){
            $curses = self::where('cur_est_id', $params['est_id'])->with(['esport', 'estat', 'circuits.categories.categoria', 'circuits.categories.inscripcions', 'circuits.checkpoints'])->get();

            return response()->json([
                'curses' => $curses,
            ]);
            
        }else{
            $curses = self::with(['esport', 'estat', 'circuits.categories.categoria', 'circuits.categories.inscripcions', 'circuits.checkpoints'])->get();
            return response()->json([
                'curses' => $curses,
            ]);
        }
        
        
    }
    
    
}
