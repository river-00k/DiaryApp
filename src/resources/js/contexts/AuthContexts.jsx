import React, { useEffect } from "react";
import {useContext, createContext} from "react";
import { useState } from "react";
import axios from "axios";
import {Route, Navigate, useHistory} from "react-router-dom";
import { AccordionSummary } from "@material-ui/core";

const authContext = createContext();


//Providerを定義 authの値をchildrenに指定したコンポーネント以下に渡す
const ProvideAuth = (props) => {
    const auth = useProvideAuth();

    return(
        <authContext.Provider value={auth}>
            {props.children}
        </authContext.Provider>
    );
}
export default ProvideAuth;


export const useAuth = () => {
    return useContext(authContext);
}

const useProvideAuth = () => {
    const [user, setUser] = useState();

    //ログイン時の処理
    const signin = async (loginData) => {

        try{
            const res = await axios.post('/api/login',loginData);
            setUser(res);
        }catch(error){
            throw error;
        }
    }

    //ユーザーがログインしているかチェックする
    useEffect(() => {
        console.log("useEffect");
        axios
            .get('/api/loginCheck')
            .then((response) => {
                setUser(response);
            }).catch(() => {
                setUser();
            });
    }, [])

    return {
        user,
        signin
    }
}

//認証済みのユーザーのみアクセス可能
export const Private = ({Component}) => {
    const auth = useAuth();
    console.log(auth);
    console.log("private");

    return(
            (auth.user != null) ? <Component /> : <Navigate to="/login" />
    );

}