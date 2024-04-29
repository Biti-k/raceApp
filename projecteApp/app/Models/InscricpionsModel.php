<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InscricpionsModel extends Model
{
    use HasFactory;

    protected $table = 'inscripcions';
    protected $primaryKey = 'ins_id';
    protected $fillable = ['ins_id','ins_par_id','ins_data','ins_dorsal','ins_retirat','ins_bea_id','ccc_id'];

    public function participant()
    {
        return $this->belongsTo(ParticipantsModel::class, 'ins_par_id');
    }
    
}
