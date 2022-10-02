
import React from 'react';
import {useDiary} from '../contexts/DiaryContext'
import Form from './Form'

const CreateForm = () => {


    const diaryProps = useDiary();
    const products = diaryProps?.products.filter((item): item is Exclude<typeof item, undefined> => typeof item !== "undefined")

    const today = new Date()

    const isSameDate = (date1: Date, date2: Date):Boolean => {
        return(
            date1.getFullYear() === date2.getFullYear() && 
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        )

    }

    const product = products?.find(obj => {return isSameDate(new Date(obj.date), today)})

   

    return <>{<Form product={ product? product : null }/>}</>

}
export default CreateForm;