<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\BeaconsController;
use App\Http\Controllers\CheckpointsController;
use App\Http\Controllers\CircuitsCategoriesController;
use App\Http\Controllers\CircuitsController;
use App\Http\Controllers\CursesController;
use App\Http\Controllers\EsportsController;
use App\Http\Controllers\EstatsCursaController;
use App\Http\Controllers\InscripcionsController;
use App\Http\Controllers\ParticipantsController;
use App\Http\Controllers\RegistresController;
use App\Models\BeaconsModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::get('get_all_beacons')
// Route::post('get_beacon')
// Route::post('store_beacon')
// Route::post('update_beacon')
// Route::post('delete_beacon')
// const get_all_beacons = '{{ route('beacons.get_all_beacons') }}';


Route::get("get_all_categories",[CategoriesController::class, "getAll"])->name("categories.get_all_categories");
Route::get('get_all_beacons', [BeaconsController::class, 'getAll'])->name('beacons.get_all_beacons');
Route::get('get_all_inscripcions', [InscripcionsController::class, 'getAll'])->name('inscripcions.get_all_inscripcions');
Route::get('get_all_participants', [ParticipantsController::class, 'getAll'])->name('participants.get_all_participants');
Route::get('get_all_esports', [EsportsController::class, 'getAll'])->name('esports.get_all_esports');
Route::get('get_all_curses', [CursesController::class, 'getAll'])->name('curses.get_all_curses');
Route::get('get_all_registres', [RegistresController::class, 'getAll'])->name('registres.get_all_registres');
Route::get('get_all_estats_cursa', [EstatsCursaController::class, 'getAll'])->name('estats_cursa.get_all_estats_cursa');
Route::get('get_all_circuits', [CircuitsController::class, 'getAll'])->name('circuits.get_all_circuits');
Route::get('get_all_circuits_categoria', [CircuitsCategoriesController::class, 'getAll'])->name('circuits_categoria.get_all_circuits_categoria');
Route::get('get_all_checkpoints', [CheckpointsController::class, 'getAll'])->name('checkpoints.get_all_checkpoints');



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
