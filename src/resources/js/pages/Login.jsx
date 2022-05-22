import React from "react";
import LoginForm from "../components/LoginForm";
import {useState, useEffect} from 'react';
import axios from 'axios';



const Login = () => {

    useEffect(()=>{
        CsrfProtectionInit();
    },[]);

    //CSRF保護を初期化する
    const CsrfProtectionInit = () => {
        axios
            .get('/sanctum/csrf-cookie')
            .then(response => {
                //SUCCESS
            }).catch(() => {
                console.log('CSUF保護の初期化に失敗しました');
            });
    }

    return(
        
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <LoginForm/>
                </div>
            </div>
        </div>
    );
    

}
export default Login;