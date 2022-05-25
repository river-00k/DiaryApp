import React from "react";
import LoginForm from "../components/LoginForm";
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useAuth} from "../contexts/AuthContexts";


const Login = () => {

    const [loginInfo, setLoginInfo] = useState({email:'', password:''});

    const [errMessage, setErrMessage] = useState();

    const auth = useAuth();

    const navigate = useNavigate();

    const refreshForm = ($message) => {
        setLoginInfo({email:'', password:''});
        setErrMessage($message);
    }

    //CSRF保護を初期化する
    const onSubmit = () => {

        if(loginInfo.email=='' && loginInfo.password==''){
            refreshForm("メールアドレスとパスワードを入力してください");
            return;
        }
        if(loginInfo.email==''){
            refreshForm("メールアドレスを入力してください");
            return;
        }
        if(loginInfo.password==''){
            refreshForm("パスワードを入力してください");
            return;
        }

        axios
            .get('/sanctum/csrf-cookie')
            .then(() => {
                auth.signin(
                    {
                        email: loginInfo.email,
                        password: loginInfo.password
                    }
                )?.then(() => {
                    //ホーム画面へ遷移
                    navigate('/example');
                }).catch((err)=>{
                    refreshForm("メールアドレスまたはパスワードが間違っています");
                });

            }).catch(() => {
                console.log('CSUF保護の初期化に失敗しました');
            });
    }


    //ユーザー情報の更新を記録する
    const inputChange = (event) =>{
        const key = event.target.name;
        const value = event.target.value;
        loginInfo[key] = value;
        let data = Object.assign({}, loginInfo);
        setLoginInfo(data);
    }

    return(
        
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <LoginForm data={loginInfo} errMsg={errMessage} inputChange={inputChange} btnFunc={onSubmit}/>
                </div>
            </div>
        </div>
    );
    

}
export default Login;