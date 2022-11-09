
import axios from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

type Props = {
    children: ReactNode
}

const DiaryContext = createContext<DiaryProps | null>(null)

export const DiaryProvider = ({children}:Props) => {

    const [product, setProduct] = useState<DiaryData | null>(null);
    const [products, setProducts] = useState< Array<DiaryData> >([]);
    const [loading, setLoading] = useState<boolean>(true)

    const auth = useAuth()
    const user = auth?.user

    const navigate = useNavigate()

    const addProduct = async(diaryData: DiaryData) => {
       
        //新しい日記の追加
        await axios.post('/api/diary/create', diaryData)
                    .then((res) => {
                        setProduct(diaryData)
                    }).catch(()=>{
                        setProduct(null)
                        console.log('Failed to adding data')
                    })
        
        //追加後の日記の読み込み
        await axios.post('/api/diary/read', user)
                    .then((res) => {
                        setProducts(res.data)
                    })
                    .catch((()=>{
                        console.log('Failed to reading data')
                    }))                        
        
        //画面遷移
        navigate("/mypage/diary/home")
        

    }
    const removeProduct = async(diaryData: DiaryData) => {
        const props = {
            id: diaryData.id,
            user_id: diaryData.user_id
        }
        
        //日記の削除
        await axios.post('/api/diary/delete', props)
                .then((res) => {
                    setProduct(diaryData)
                }).catch(() => {
                    setProduct(null)
                })
        
         //編集後のDBの読み込み
         await axios.post('/api/diary/read', user)
            .then((res) => {
                setProducts(res.data)
            })
            .catch((()=>{
                console.log('Failed to reading data')
            }))
        
    }
    const editProduct = async(diaryData: DiaryData) => {

        //データの編集
        await axios.post('/api/diary/update', diaryData)
                .then((res) => {
                    setProduct(diaryData)
            
                }).catch(() => {
                    setProduct(null)
                    console.log("Failed to update!")
                })
        
        //編集後のDBの読み込み
        await axios.post('/api/diary/read', user)
                .then((res) => {
                    setProducts(res.data)
                })
                .catch((()=>{
                    console.log('Failed to reading data')
                }))

        //画面遷移
        navigate("/mypage/diary/home")
    }

    const value: DiaryProps = {
        product,
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