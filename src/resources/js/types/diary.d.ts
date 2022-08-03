type DiaryData = {
    id: number,
    date: Date,
    user_id: number,
    title: string,
    description: JSON,
    image_url: string
}


type DiaryProps = {
    products: Array<DiaryData>,
    addProduct: (displayDiaryData: DiaryData)=>Promise<void>,
    removeProduct: ( displayDiaryData: DiaryData )=>Promise<void>,
    editProduct: (displayDiaryData: DiaryData)=>Promise<void>
}