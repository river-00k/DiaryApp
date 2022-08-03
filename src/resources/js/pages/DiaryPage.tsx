 import React, { useCallback, useEffect, useState } from 'react';
 import { Outlet,  useOutletContext} from "react-router-dom";
 import '../app.css'
 import Content from "../components/Content"
 import Container from '../styles/Container'
 import GlobalStyle from '../styles/GlobalStyle'
 import Background from '../layout/Background'
import { DiaryProvider } from '../contexts/DiaryContext';
import { slide as Menu } from 'react-burger-menu'


 const DiaryPage = () => {

    const styles = {
        bmBurgerButton: {
          position: 'fixed',
          width: '36px',
          height: '30px',
          left: '36px',
          top: '36px'
        },
        bmBurgerBars: {
          background: '#373a47'
        },
        bmBurgerBarsHover: {
          background: '#a90000'
        },
        bmCrossButton: {
          height: '24px',
          width: '24px'
        },
        bmCross: {
          background: '#bdc3c7'
        },
        bmMenuWrap: {
          position: 'fixed',
          height: '100%'
        },
        bmMenu: {
          background: '#373a47',
          padding: '2.5em 1.5em 0',
          fontSize: '2.0em',
          fontWeight: 'bold'
        },
        bmMorphShape: {
          fill: '#373a47'
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em'
        },
        bmItem: {
          display: 'block'
        },
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0.3)'
        }
      }

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
        <>  <Menu styles={ styles } >
            <a id="login" className="menu-item" href="/login">Logout</a>
            <a id="about" className="menu-item" href="/about">About</a>
            <a id="contact" className="menu-item" href="/contact">Contact</a>
            </Menu>
            <GlobalStyle />
            {/* <Background> */}
                <Container>
                    <Content>
                        <DiaryProvider>
                            <Outlet/>
                        </DiaryProvider>
                    </Content>
                </Container>
            {/* </Background> */}
      </>
     );
};

export default DiaryPage
