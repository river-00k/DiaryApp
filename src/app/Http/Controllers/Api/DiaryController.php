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

    //アカウントに紐付く全ての日記データを削除する
    public function deleteAll(Request $request){
        $result = Diary::where('user_id', $request->id)->delete();

        return response()->json($result, 200);
        

    }

    //ゲストアカウントにサンプルデータを追加する
    public function addSampleToGuestAccount(Request $request){
        #一つ目の日記を追加
        $diary = new Diary;
        $diary->user_id = $request->user_id;
        $diary->date = date("Y-m-d");
        $diary->title = "ようこそ";
        $diary->description = json_encode([
            'blocks'=>[
              [
                'key'=> '2fit1',
                'text'=>
                  'Proin nec est aliquet, malesuada tellus id, ultrices metus. Nam tincidunt odio vitae erat volutpat faucibus. Sed finibus, ex at condimentum laoreet, justo dolor euismod mi, sit amet consectetur ante leo eget metus.',
                'type'=> 'unstyled',
                'depth'=> 0,
                'inlineStyleRanges'=> [
                  [ 'offset'=> 23, 'length'=> 9, 'style'=> 'ITALIC' ],
                  [ 'offset'=> 59, 'length'=> 40, 'style'=> 'muted' ],
                  [ 'offset'=> 60, 'length'=> 47, 'style'=> 'BOLD' ],
                  [ 'offset'=> 99, 'length'=> 8, 'style'=> 'danger' ],
                  [ 'offset'=> 99, 'length'=> 8, 'style'=> 'UNDERLINE' ],
                ],
                'entityRanges'=> [],
                'data'=> [],
                ],
            ],
            'entityMap'=>[],
        ]);
        $diary->image_url = "";
        $diary->evaluation = 4;
        $diary->save();

        #二つ目の日記を追加
        $diary = new Diary;
        $diary->user_id = $request->user_id;
        $diary->date = date("Y-m-d");
        $diary->title = "Hello!";
        $diary->description = json_encode([
            'blocks'=>[
                [
                    'key'=> '6eojn',
                    'text'=>
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
                    'type'=> 'unstyled',
                    'depth'=> 0,
                    'inlineStyleRanges'=> [],
                    'entityRanges'=> [],
                    'data'=> [],
                ],
                [
                    'key'=> 'f29s7',
                    'text'=>
                        'Nam semper lacus non consequat consequat.',
                    'type'=> 'unordered-list-item',
                    'depth'=> 0,
                    'inlineStyleRanges'=> [],
                    'entityRanges'=> [],
                    'data'=> [],
                ],
                [
                    'key'=> 'amtsm',
                    'text'=>
                        'Proin augue urna, tristique dictum molestie ac, pellentesque ut augue.',
                    'type'=> 'unordered-list-item',
                    'depth'=> 0,
                    'inlineStyleRanges'=> [],
                    'entityRanges'=> [],
                    'data'=> [],
                ],
            ],
            'entityMap'=>[],
        ]);
        $diary->image_url = "";
        $diary->evaluation = 5;
        $diary->save();
    }


    //テーブルの全てのデータを表示する(開発確認用)
    public function showTable()
    {
        $diaries = Diary::all();
        return response()->json($diaries, 200);
    }
    


}
