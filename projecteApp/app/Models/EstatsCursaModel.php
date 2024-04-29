<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstatsCursaModel extends Model
{
    use HasFactory;
    protected $table= 'estats_cursa';
    protected $fillable = ['est_id','est_nom'];
    protected $primaryKey = 'est_id';
}
