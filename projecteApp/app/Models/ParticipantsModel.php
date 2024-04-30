<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipantsModel extends Model
{
    use HasFactory;

    protected $table = 'participants';
    protected $primaryKey = 'par_id';
    protected $fillable = ['par_id','par_nif','par_nom','par_cognoms','par_data_naixement','par_telefon','par_email','par_es_federat'];

    public function inscripcions()
    {
        return $this->hasMany(InscripcionsModel::class, 'ins_id');
    }

}
