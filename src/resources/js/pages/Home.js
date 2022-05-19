import { Button, Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../components/MainTable';
import React, { useState, useEffect }　from 'react'; //1行目にuseStateを変更する
import axios from 'axios';　//追記する
//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

// ------------- 以下の部分は変更無し

//ヘッダーのコンテンツ用の配列定義
const headerList = ['id', 'テキスト', '編集', '完了'];


function Home() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

        //postsの状態を管理する
        const [diary, setPosts] = useState([]);

        
    //画面に到着したらgetPostsDataを呼ぶ
    useEffect(() => {
        getPostsData();
    },[])
    
    const getPostsData = () => {
        axios
            .get('/api/diary/showTable')
            .then(response => {
                setPosts(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

        //空配列として定義する
    let rows = [];
    //postsの要素ごとにrowsで使える形式に変換する
    diary.map((diary) =>
        rows.push({
            user_id: diary.user_id,
            text: diary.text,
            editBtn: <Button color="secondary" variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained">完了</Button>,
        })
    );

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card">
                        <h1>日記</h1>
                        <Card className={classes.card}>
                            {/* テーブル部分の定義 */}
                            <MainTable headerList={headerList} rows={rows} />
                        </Card>
                    </div>
                </div>
                </div>
        </div>
    );
}
export default Home;