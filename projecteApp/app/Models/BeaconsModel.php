<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BeaconsModel extends Model
{
    use HasFactory;

    protected $table = 'beacons'; 
    protected $primaryKey = 'bea_id';
    protected $fillable = ['bea_id','bea_code'];

    
    public function inscripcions(){
        return $this->hasMany(InscripcionsModel::class, 'ins_bea_id');
    }
}
