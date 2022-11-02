 import React, { useCallback, useEffect, useState } from 'react';
 import { Outlet,  useOutletContext} from "react-router-dom";
 import '../app.css'
 import Content from "../components/Content"
 import Container from '../styles/Container'
 import GlobalStyle from '../styles/GlobalStyle'
 import Background from '../layout/Background'
import { DiaryProvider } from '../contexts/DiaryContext';


 const DiaryPage = () => {

    const title: string = "日記ページ"
    const　subtitle: string = "日々の記録"

    return (
        <>  
            <GlobalStyle />
            <Container>
                <Content title={title} subtitle={subtitle}>
                    <DiaryProvider>
                        <Outlet/>
                    </DiaryProvider>
                </Content>
            </Container>
      </>
     );
};

export default DiaryPage
