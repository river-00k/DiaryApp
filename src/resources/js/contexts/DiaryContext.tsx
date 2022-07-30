
import axios from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

type Props = {
    children: ReactNode
}

const DiaryContext = createContext<DiaryProps | null>(null)

export const DiaryProvider = ({children}:Props) => {

    const [products, setProducts] = useState< Array<DiaryData> >([]);
    const [loading, setLoading] = useState<boolean>(true)

    const auth = useAuth()
    const user = auth?.user

    const navigate = useNavigate()

    const addProduct = async(diaryData: DiaryData) => {
        
        try{
            await axios.post('/api/diary/create', diaryData)
                        .then((res) => {
                            setProducts(res.data)
                        }).catch(()=>{
                            console.log('Faild to adding data')
                        })
            
            navigate("/mypage/diary/home")
        }catch(error){
            console.log("Adding Failed")
            throw error
        }

    }
    const removeProduct = async(diaryData: DiaryData) => {
        const props = {
            id: diaryData.id,
            user_id: diaryData.user_id
        }
        try{
            await axios.post('/api/diary/delete', props)
                    .then((res) => {
                        setProducts(res.data)
                    }).catch(() => {
                        console.log('Faild to removing data')
                    })
        }catch(error){
            console.log("Diary Delete Failed")
            throw error
        }
    }
    const editProduct = async(diaryData: DiaryData) => {

        await axios.post('/api/diary/update', diaryData)
                .then((res) => {
                    setProducts(res.data)
                }).catch(() => {
                    console.log("Failed to update!")
                })
        navigate("/mypage/diary/home")
    }

    const value: DiaryProps = {
        products,
        addProduct,
        removeProduct,
        editProduct
    }

    //日記データを取得する処理
    useEffect(()=>{
        if(user){
            axios.post('/api/diary/read', user)
                .then((res)=>{
                    setProducts(res.data)
                    setLoading(false)
                }).catch(()=>{
                    console.log("faild to get diary table")
                    setLoading(false)
                })
        }
    },[])

    return( 
        <DiaryContext.Provider value={value}>
            {! loading && children}
        </DiaryContext.Provider>
    )
}

export const useDiary = ():DiaryProps | null =>{
    return useContext(DiaryContext)
}