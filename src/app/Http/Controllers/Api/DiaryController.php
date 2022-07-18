<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\Diary;
use App\Http\Controllers\Controller;

class DiaryController extends Controller
{

    //Diaryの行をを鵜入
    public function create(Request $request)
    {
        $diary = new Diary;
        $diary->user_id = $request->user_id;
        $diary->date = date("Y-m-d");
        $diary->title = $request->title;
        $diary->description = json_encode($request->description);
        //$diary->description = json_encode(["a"=>"cx"]);
        $diary->image_url = $request->image_url;
        
        $diary->save();

        //成功したらHTTPステータス200(成功)を返却する
        return response()->json($diary, 200);
    }

    //Diaryの特定ユーザー一覧表示
    public function read(Request $request)
    {
        $diaries = Diary::where('user_id',$request->id)->get();
        return response()->json($diaries, 200);
    }

    //Diaryの特定ユーザー一覧表示
    public function readAll(Request $request)
    {
        $diary = Diary::where('user_id',$request->user_id)->get();
        return $diary;
    }

    public function update(Request $request)
    {
        $diary = Diary::where('user_id', $request->user_id)
                        ->where('date', $request->date)
                        ->update(['text'=>$request->text]);
   
        return response()->json($diary, 200);
    }

    //Diaryの特定行を削除する
    public function delete(Request $request)
    {
        $diary = Diary::where('user_id',$request->user_id)
                        ->where('date', $request->date)
                        ->delete();
        return response()->json($diary, 200);
    }


    //テーブルの全てのデータを表示する(開発確認用)
    public function showTable()
    {
        $diaries = Diary::all();
        return response()->json($diaries, 200);
    }
    


}
