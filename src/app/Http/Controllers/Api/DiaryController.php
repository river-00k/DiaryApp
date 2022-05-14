<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DiaryController extends Controller
{
    //Diaryの一覧表示
    public function readAll(Request $request)
    {
        $diary = Diary::find($request->id);
        return $diary;
    }

    
}
