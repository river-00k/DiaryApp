type DiaryProduct = {
    id: number,
    user_id: number,
    date: Date,
    title: string,
    description: JSON,
    image_url: string
}

type DiaryProps = {
    products: Array<DiaryProduct>,
    addProduct: ()=>void,
    removeProduct: ()=>void,
    editProduct: ()=>void
}