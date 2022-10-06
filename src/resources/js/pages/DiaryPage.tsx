 import React, { useCallback, useEffect, useState } from 'react';
 import { Outlet,  useOutletContext} from "react-router-dom";
 import '../app.css'
 import Content from "../components/Content"
 import Container from '../styles/Container'
 import GlobalStyle from '../styles/GlobalStyle'
 import Background from '../layout/Background'
import { DiaryProvider } from '../contexts/DiaryContext';



 const DiaryPage = () => {

    return (
        <>  
            <GlobalStyle />
            <Container>
                <Content>
                    <DiaryProvider>
                        <Outlet/>
                    </DiaryProvider>
                </Content>
            </Container>
      </>
     );
};

export default DiaryPage
