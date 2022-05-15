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
    Route::post('post/read', 'App\Http\Controllers\Api\DiaryController@read');
    Route::post('post/create', 'App\Http\Controllers\Api\DiaryController@create');
    Route::post('post/update', 'App\Http\Controllers\Api\DiaryController@update');
    Route::post('post/delete', 'App\Http\Controllers\Api\DiaryController@delete');
    Route::get('post/showTable', 'App\Http\Controllers\Api\DiaryController@showTable');
});

