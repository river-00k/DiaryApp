type InputDiaryData = {
    user_id: number,
    title: string,
    description: JSON,
    image_url: string
}

type DisplayDiaryData = InputDiaryData &{
    id: number,
    date: Date,
}

type DiaryProps = {
    products: Array<DisplayDiaryData>,
    addProduct: (inputDiaryData: InputDiaryData)=>void,
    removeProduct: ()=>void,
    editProduct: ()=>void
}