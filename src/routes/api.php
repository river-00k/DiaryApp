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

    //ログイン前API各種
    Route::post('login', 'App\Http\Controllers\Auth\LoginController@login');
    Route::post('register', 'App\Http\Controllers\Auth\RegisterController@register');
    Route::post('logout', 'App\Http\Controllers\Auth\LoginController@logout');
    Route::get('loginCheck', 'App\Http\Controllers\Auth\LoginController@loginCheck');
    Route::post('requestCheck', 'App\Http\Controllers\Auth\LoginController@requestCheck');
    Route::get('guestRegister', 'App\Http\Controllers\Auth\RegisterController@guestRegister');
    Route::post('addSampleToGuestAccount', 'App\Http\Controllers\Api\DiaryController@addSampleToGuestAccount');
    

    //認証後でないと操作を許可しない
    Route::group(["middleware" => ["auth:sanctum"]], function(){
        Route::post('diary/create', 'App\Http\Controllers\Api\DiaryController@create');
        Route::post('diary/read', 'App\Http\Controllers\Api\DiaryController@read');
        Route::post('diary/readAll', 'App\Http\Controllers\Api\DiaryController@readAll');
        Route::post('diary/update', 'App\Http\Controllers\Api\DiaryController@update');
        Route::post('diary/delete', 'App\Http\Controllers\Api\DiaryController@delete');
        Route::get('diary/showTable', 'App\Http\Controllers\Api\DiaryController@showTable');
        Route::post('diary/deleteAll', 'App\Http\Controllers\Api\DiaryController@deleteAll');
        Route::post('withdrawal', 'App\Http\Controllers\Auth\RegisterController@withdrawal');
    });
});

