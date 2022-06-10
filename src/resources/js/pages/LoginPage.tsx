import { AccordionSummary } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext';
import LoginForm from '../components/LoginForm';



const LoginPage = () => {

    const [loginInfo, setLoginInfo] = useState<LoginData>({email:'', password:''})

    const [errMessage, setErrMessage] = useState<string> ('')

    const auth = useAuth()

    const refreshForm = (message: string) => {
        setLoginInfo({email:'', password:''})
        setErrMessage(message)
    }


    //ログインボタン押下時の処理
    const onSubmit = () => {

        if(loginInfo.email=='' && loginInfo.password=='' ){
            refreshForm("メールアドレスとパスワードを入力してください")
            return ;
        }
        if(loginInfo.email == ''){
            refreshForm("メールアドレスを入力してください")
            return ;
        }
        if(loginInfo.password == ''){
            refreshForm("パスワードを入力してください")
            return ;
        }

        axios
            .get('/sanctum/csrf-cookie')
            .then(() => {
                auth?.login(loginInfo)
                    .then(() => {
                    //login成功
                    }).catch(() => {
                        refreshForm("メールアドレスまたはパスワードが間違っています")
                    })
            }).catch(() => {
                console.log('CSRF保護の初期化に失敗しました')
            })


    }

    //ログイン情報の更新を記録する
    const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        //TypeGurd
        if (!(event.target instanceof HTMLInputElement)) {
            return;
        }

        const key = event.target.name
        const value = event.target.value
        loginInfo[key] = value
        let data = Object.assign({}, loginInfo)
        setLoginInfo(data)
    }

    return (
        <div>
           <LoginForm data={loginInfo} errMsg={errMessage} inputChange={inputChange} btnFunc={onSubmit}/>
        </div>
    )
}

export default LoginPage