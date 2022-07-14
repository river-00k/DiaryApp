
import React, { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
    children: ReactNode
}

const DiaryContext = createContext<DiaryProps | null>(null)

export const DiaryProvider = ({children}:Props) => {

    const [products, setProducts] = useState< Array<DiaryProduct> >([]);

    const addProduct = () => {}
    const removeProduct = () => {}
    const editProduct = () => {}

    const value: DiaryProps = {
        products,
        addProduct,
        removeProduct,
        editProduct
    }

    return( 
        <DiaryContext.Provider value={value}>
            {children}
        </DiaryContext.Provider>
    )
}

export const useDiary = ():DiaryProps | null =>{
    return useContext(DiaryContext)

}