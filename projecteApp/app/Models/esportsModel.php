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
}
