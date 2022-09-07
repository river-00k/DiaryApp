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
        $diary->description = $request->description;
        $diary->image_url = "";
        $diary->evaluation = $request->evaluation;
        
        $diary->save();

        $diaries = Diary::where('user_id',$request->user_id)
                        ->orderBy('date', 'desc')
                        ->get();

        //成功したらHTTPステータス200(成功)を返却する
        return response()->json($diaries, 200);
    }

    //Diaryの特定ユーザー一覧表示
    public function read(Request $request)
    {
        $diaries = Diary::where('user_id',$request->id)
                        ->orderBy('date', 'desc')
                        ->get();
        return response()->json($diaries, 200);
    }


    //日記を編集する
    public function update(Request $request)
    {
        $diary = Diary::where('id', $request->id)
                        ->where('user_id', $request->user_id)
                        ->update([
                            'title'=>$request->title,
                            'description'=>$request->description,
                            'evaluation'=>$request->evaluation
                        ]);

        //更新に失敗した場合の処理
        if($diary != 1){
            return response()->json("Parameter Error", 400);
        }

        //成功したら一覧を返却する
        $diaries = Diary::where('user_id',$request->user_id)
                        ->orderBy('date', 'desc')
                        ->get();
        return response()->json($diaries, 200);
    }

    //日記を削除する
    public function delete(Request $request)
    {
        //日記を削除する
        $diary = Diary::where('id',$request->id)
                        ->where('user_id', $request->user_id)
                        ->delete();

        if($diary != 1){
            return response()->json("Parameter Error", 400);
        }

        //削除成功した時に結果を返却
        $diaries = Diary::where('user_id',$request->user_id)
                        ->orderBy('date', 'desc')            
                        ->get();
        return response()->json($diaries, 200);
    }


    //テーブルの全てのデータを表示する(開発確認用)
    public function showTable()
    {
        $diaries = Diary::all();
        return response()->json($diaries, 200);
    }
    


}
