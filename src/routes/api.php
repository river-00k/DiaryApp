<?php

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

Route::group(['middleware' => 'api'], function(){


    Route::post('login', 'App\Http\Controllers\Auth\LoginController@login');
    Route::get('loginCheck', 'App\Http\Controllers\Auth\LoginController@loginCheck');
    

    //認証後でないと操作を許可しない
    Route::group(["middleware" => ["auth:sanctum"]], function(){
        Route::post('diary/create', 'App\Http\Controllers\Api\DiaryController@create');
        Route::post('diary/read', 'App\Http\Controllers\Api\DiaryController@read');
        Route::post('diary/readAll', 'App\Http\Controllers\Api\DiaryController@readAll');
        Route::post('diary/update', 'App\Http\Controllers\Api\DiaryController@update');
        Route::post('diary/delete', 'App\Http\Controllers\Api\DiaryController@delete');
        Route::get('diary/showTable', 'App\Http\Controllers\Api\DiaryController@showTable');
    });
});

