 import React, { useCallback } from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter, Outlet, Route ,Routes, useOutletContext} from "react-router-dom";
 import AppRoutes from "../AppRoutes";
 import { ThemeProvider } from 'styled-components'
 import { FlashProvider } from "../components/FlashContext";
 import '../app.css'
 import sampleData from '../sample-data';
 import Content from "../components/Content"
 import useHistory from '../hooks/useHistory';
 import Container from '../styles/Container'
 import useDarkMode from '../hooks/useDarkMode'
 import { lightTheme, darkTheme } from '../styles/theme'
 import ThemeButton from '../components/ThemeButton'
 import GlobalStyle from '../styles/GlobalStyle'
 import Background from '../layout/Background'
 //import Home from './pages/Home';

 const DiaryPage = () => {
    const { theme, toggleTheme, isThemeSet } = useDarkMode()
    const themeMode = theme === 'light' ? lightTheme : darkTheme
    // wait till theme has been set to prevent initializing with one theme and
    // immediately switching, creating a flash, to another based on user
    // preference
    //if (!isThemeSet) return <div />

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
        const updatedProducts = currentListOfProducts.map(item => {
            if (item.id === id) return product;
            return item;
        });

        updateHistory({ updatedProducts, flashMessage: `${title} Updated!` });
        },
        [getCurrentProducts, updateHistory]
    );

    const products = getCurrentProducts([])
    
    return (
        <>

                <GlobalStyle />
                <Background>
                    <Container>
                        <ThemeButton
                        theme={theme}
                        toggleTheme={toggleTheme}
                        className="mb-8"
                        />
                        <Content>
                            <Outlet context = {{products, removeProduct, addProduct, editProduct}}/>
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