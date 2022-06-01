<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * ユーザーを認証する
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */

     public function login(Request $request){
        
        $credentials = $request->validate([
            "email" => ["required", "email"],
            "password" => ["required"],
        ]);
        
        if(Auth::attempt($credentials)){
            $request->session()->regenerate();
            return response()->json(Auth::user(),200);
        }else{
            return response()->json([],401);
        }
        

     }

     public function loginCheck(){
         if(Auth::check()){
             return response()->json(Auth::user(),200);
         }else{
             return response()->json([],401);
         }
     }
    
}
