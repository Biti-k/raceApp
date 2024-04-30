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

    public function curses ()
    {
        return $this->hasMany(CursesModel::class, 'cur_est_id');
    }

    public static function getWithRelations($params = null)
    {
        //$estats = self::with(['curses'])->get();
        $estats = self::all();
        
        return response()->json([
            'estats_cursa' => $estats,
        ]);
    }

}
