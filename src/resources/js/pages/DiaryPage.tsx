 import React, { useCallback, useEffect, useState } from 'react';
 import { Outlet,  useOutletContext} from "react-router-dom";
 import '../app.css'
 import Content from "../components/Content"
 import Container from '../styles/Container'
 import GlobalStyle from '../styles/GlobalStyle'
 import Background from '../layout/Background'
import { DiaryProvider } from '../contexts/DiaryContext';


 const DiaryPage = () => {

    // const addProduct = useCallback(
    //     product => {
    //     const { title } = product;
    //     const currentProducts = getCurrentProducts([]);
    //     const updatedProducts = [product, ...currentProducts];
    //     updateHistory({ updatedProducts, flashMessage: `${title} Added!` });
    //     },
    //     [getCurrentProducts, updateHistory]
    // );

    // const removeProduct = useCallback(
    //     product => {
    //     const { id, title } = product;
    //     const currentListOfProducts = getCurrentProducts();
    //     const updatedProducts = currentListOfProducts.filter(item => item.id !== id);
    //     updateHistory({ updatedProducts, flashMessage: `${title} Deleted!` });
    //     },
    //     [getCurrentProducts, updateHistory]
    // );
    // const editProduct = useCallback(
    //     product => {
    //     const { id, title } = product;
    //     const currentListOfProducts = getCurrentProducts();
    //     const updatedProducts = currentListOfProducts.map(item => {
    //         if (item.id === id) return product;
    //         return item;
    //     });

    //     updateHistory({ updatedProducts, flashMessage: `${title} Updated!` });
    //     },
    //     [getCurrentProducts, updateHistory]
    // );

    return (
        <>
            <GlobalStyle />
            <Background>
                <Container>
                    <Content>
                        <DiaryProvider>
                            <Outlet/>
                        </DiaryProvider>
                    </Content>
                </Container>
            </Background>
      </>
     );
};

export default DiaryPage
