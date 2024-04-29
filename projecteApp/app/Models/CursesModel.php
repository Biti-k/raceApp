<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CursesModel extends Model
{
    use HasFactory;
    protected $table = 'curses';
    protected $primaryKey = 'cur_id';
    protected $fillable = ['cur_id','cur_nom','cur_data_inici','cur_data_fi','cur_lloc','cur_esp_id','cur_est_id','cur_desc','cur_limit_inscr','cur_foto','cur_web',];

    public function esports()
    {
        return $this->belongsTo(EsportsModel::class, 'cur_esp_id');
    }

    public function estat()
    {
        return $this->belongsTo(EstatsCursaModel::class, 'cur_est_id');
    }
    
}
