<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CircuitsModel extends Model
{
    use HasFactory;
    protected $primaryKey = "cir_id";
    protected $table = "circuits";
    protected $fillable = ['cir_id','cir_cur_id','cir_num','cir_distancia','nom','preu','cir_temps_estimat'];

    public function curses(){
        return $this->belongsTo(CursesModel::class, "cir_cur_id");
    }

    public function checkpoints(){
        return $this->hasMany(CheckpointsModel::class, "chk_id");
    }
}
