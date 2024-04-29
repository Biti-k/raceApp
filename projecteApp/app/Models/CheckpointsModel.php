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
}
