<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmployeeController;
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

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

//Public routes

Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('employees', [EmployeeController::class, 'getEmployees']);
    Route::get('employee/{id}', [EmployeeController::class, 'getEmployeeByID']);
    Route::post('employee/add', [EmployeeController::class, 'addEmployee']);
    Route::put('employee/edit/{id}', [EmployeeController::class, 'updateEmployee']);
    Route::delete('employee/delete/{id}', [EmployeeController::class, 'deleteEmployee']);

});






