 import React, { useCallback, useEffect, useState } from 'react';
 import { Outlet,  useOutletContext} from "react-router-dom";
 import '../app.css'
 import sampleData from '../sample-data';
 import Content from "../components/Content"
 import useHistory from '../hooks/useHistory';
 import Container from '../styles/Container'
 import GlobalStyle from '../styles/GlobalStyle'
 import Background from '../layout/Background'
 import axios from 'axios';


 const DiaryPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState<boolean>(true)

    const { getCurrentHistory: getCurrentProducts, updateHistory } = useHistory([[...sampleData]]);

    const addProduct = useCallback(
        product => {
        const { title } = product;
        const currentProducts = getCurrentProducts([]);
        const updatedProducts = [product, ...currentProducts];
        updateHistory({ updatedProducts, flashMessage: `${title} Added!` });
        },
        [getCurrentProducts, updateHistory]
    );

    const removeProduct = useCallback(
        product => {
        const { id, title } = product;
        const currentListOfProducts = getCurrentProducts();
        const updatedProducts = currentListOfProducts.filter(item => item.id !== id);
        updateHistory({ updatedProducts, flashMessage: `${title} Deleted!` });
        },
        [getCurrentProducts, updateHistory]
    );
    const editProduct = useCallback(
        product => {
        const { id, title } = product;
        const currentListOfProducts = getCurrentProducts();
        console.log("editProduct")
        const updatedProducts = currentListOfProducts.map(item => {
            if (item.id === id) return product;
            return item;
        });

        updateHistory({ updatedProducts, flashMessage: `${title} Updated!` });
        },
        [getCurrentProducts, updateHistory]
    );

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
    

    return (
        <>
            <GlobalStyle />
            <Background>
                <Container>
                    <Content>
                        {!loading && <Outlet context = {{products, removeProduct, addProduct, editProduct}}/> }
                    </Content>
                </Container>
            </Background>
      </>
     );
};

export default DiaryPage

export const useDiary = () => {
    return useOutletContext()
}