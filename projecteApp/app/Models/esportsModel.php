<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EsportsModel extends Model
{
    use HasFactory;
    protected $primaryKey = "esp_id";
    protected $table = "esports";
    protected $fillable = ["esp_nom", "esp_id"];

    public function categories()
    {
        return $this->hasMany(CategoriesModel::class, 'cat_esp_id');
    }

    public static function getWithRelations($params = null)
    {

        $esports = self::with(['categories'])->get();
        
        return response()->json([
            'esports' => $esports,
        ]);
    }
}
