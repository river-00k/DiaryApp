
import axios from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext';

type Props = {
    children: ReactNode
}

const DiaryContext = createContext<DiaryProps | null>(null)

export const DiaryProvider = ({children}:Props) => {

    const [products, setProducts] = useState< Array<DisplayDiaryData> >([]);
    const [loading, setLoading] = useState<boolean>(true)

    const auth = useAuth()
    const user = auth?.user

    const addProduct = (inputDiaryData: InputDiaryData) => {
        axios.post('/api/diary/create', inputDiaryData)
            .then((res) => {
                console.log("insert success")
                console.log(res)
            }).catch((res) =>{
                console.log("input failed")
            })
    }
    const removeProduct = () => {}
    const editProduct = () => {}

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