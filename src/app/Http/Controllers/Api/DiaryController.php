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
        
        #1つ目のサンプルを挿入
        $diary = new Diary;
        $diary->user_id = $request->user_id;
        $diary->date = date("Y-m-d", strtotime('-1 day', time()));
        $diary->title = "こんにちは！";
        $diary->description = json_encode([
            'blocks'=>[
            [
                'key'=> 'e78b8',
                'text'=>
                '毎日コツコツアウトプットしましょう。',
                'type'=> 'unstyled',
                'depth'=> 0,
                'inlineStyleRanges'=> [],
                'entityRanges'=> [],
                'data'=> [],
                ],
                [
                'key'=> '6nodd',
                'text'=>
                    '積み重ねが成功の秘訣です。',
                'type'=> 'unstyled',
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
        
        #2つ目のサンプルを挿入
        $diary = new Diary;
        $diary->user_id = $request->user_id;
        $diary->date = date("Y-m-d", strtotime('-2 day', time()));
        $diary->title = "箇条書きで簡潔に整理";
        $diary->description = json_encode([
            'blocks'=>[
                [
                    'key'=> '2fit1',
                    'text'=>
                        '箇条書き1',
                    'type'=> 'unordered-list-item',
                    'depth'=> 0,
                    'inlineStyleRanges'=> [
                        [ 'offset'=> 0, 'length'=> 5, 'style'=> 'muted' ],
                    ],
                    'entityRanges'=> [],
                    'data'=> [],
                ],
                [
                    'key'=> 'b2l4q',
                    'text'=>
                        '箇条書き2',
                    'type'=> 'unordered-list-item',
                    'depth'=> 0,
                    'inlineStyleRanges'=> [],
                    'entityRanges'=> [],
                    'data'=> [],
                ],
                [
                    'key'=> '5v7k1',
                    'text'=>
                        '箇条書き3',
                    'type'=> 'unordered-list-item',
                    'depth'=> 0,
                    'inlineStyleRanges'=> [
                        [ 'offset'=> 0, 'length'=> 5, 'style'=> 'danger' ],
                    ],
                    'entityRanges'=> [],
                    'data'=> [],
                ],
            ],
            'entityMap'=>[],
        ]);
        $diary->image_url = "";
        $diary->evaluation = 3;
        $diary->save();

        #3つ目のサンプルを挿入
        $diary = new Diary;
        $diary->user_id = $request->user_id;
        $diary->date = date("Y-m-d", strtotime('-3 day', time()));
        $diary->title = "チャート機能で日々の変化を確認";
        $diary->description = json_encode([
            'blocks'=>[
            [
                'key'=> '6eojn',
                'text'=>
                '左上メニュー > Chart',
                'type'=> 'unstyled',
                'depth'=> 0,
                'inlineStyleRanges'=> [],
                'entityRanges'=> [],
                'data'=> [],
                ],
            ],
            'entityMap'=>[],
        ]);
        $diary->image_url = "";
        $diary->evaluation = 4;
        $diary->save();


        #4つ目の日記を追加
        $diary = new Diary;
        $diary->user_id = $request->user_id;
        $diary->date = date("Y-m-d", strtotime('-4 day', time()));
        $diary->title = "今後も継続してアップデート";
        $diary->description = json_encode([
            'blocks'=>[
              [
                'key'=> '2fit1',
                'text'=>
                  'お客様の声をお待ちしております。',
                'type'=> 'unstyled',
                'depth'=> 0,
                'inlineStyleRanges'=> [],
                'entityRanges'=> [],
                'data'=> [],
                ],
            ],
            'entityMap'=>[],
        ]);
        $diary->image_url = "";
        $diary->evaluation = 2;
        $diary->save();
    }


    //テーブルの全てのデータを表示する(開発確認用)
    public function showTable()
    {
        $diaries = Diary::all();
        return response()->json($diaries, 200);
    }
    


}
