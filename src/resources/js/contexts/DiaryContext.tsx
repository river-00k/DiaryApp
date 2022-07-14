
import axios from 'axios';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type Props = {
    children: ReactNode
}

const DiaryContext = createContext<DiaryProps | null>(null)

export const DiaryProvider = ({children}:Props) => {

    const [products, setProducts] = useState< Array<DiaryProduct> >([]);
    const [loading, setLoading] = useState<boolean>(true)

    const addProduct = () => {}
    const removeProduct = () => {}
    const editProduct = () => {}

    const value: DiaryProps = {
        products,
        addProduct,
        removeProduct,
        editProduct
    }

    useEffect(()=>{
        axios.get('/api/showDiaryTable')
            .then((res)=>{
                setProducts(res.data)
                setLoading(false)
            }).catch(()=>{
                console.log("faild to get diary table")
                setLoading(false)
            })
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