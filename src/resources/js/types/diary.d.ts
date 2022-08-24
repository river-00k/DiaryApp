type DiaryData = {
    id: number,
    date: Date,
    user_id: number,
    title: string,
    description: JSON,
    evaluation: number,
    image_url: string
}


type DiaryProps = {
    product: DiaryData | nul,
    products: Array<DiaryData>,
    addProduct: (displayDiaryData: DiaryData)=>Promise<void>,
    removeProduct: ( displayDiaryData: DiaryData )=>Promise<void>,
    editProduct: (displayDiaryData: DiaryData)=>Promise<void>
}