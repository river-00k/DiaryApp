import React, { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


type Props = {
    children: ReactNode
}


const AuthContext = createContext <AuthProps | null>(null)

export const AuthProvider = ({children}:Props):ReactElement => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)

    //ログイン関数・Promise型で返却したいため、async, awaitを利用する
    const login = async(loginData:LoginData)=> {
        try{
            const res = await axios.post('/api/login', loginData)
            setUser(res.data)
            navigate("/mypage/diary/home")
        }catch(error){
            throw error
        }
    }

    //ユーザー登録関数・Promise型で返却する
    const register = async(registerData:RegisterData)=>{
        try{
            await axios.post('/api/register', registerData)
        }catch(error){
            throw error
        }
        
    }
    
    //ログアウト関数
    const logout = async() => {

        try{
            await axios.post('/api/logout', {} )
            setUser(null)
            console.log("logout success")
            navigate("/login")
        }catch(error){
            console.log("logout failed")
            throw error
        }
    }

    useEffect(() => {
        axios
            .get('/api/loginCheck')
            .then((res) => {
                setUser(res.data)
                setLoading(false)
            }).catch(() => {
                setUser(null)
                setLoading(false)
            })
    },[])

    const value: AuthProps = {
        user,
        login,
        register,
        logout
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )


}

export const useAuth = ():AuthProps | null => {
    return useContext(AuthContext)
}