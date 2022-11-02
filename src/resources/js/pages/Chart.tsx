import React, { useCallback, useEffect, useState } from 'react';
import { Outlet,  useOutletContext} from "react-router-dom";
import '../app.css'
import Content from "../components/Content"
import Container from '../styles/Container'
import GlobalStyle from '../styles/GlobalStyle'
import Background from '../layout/Background'
import { DiaryProvider } from '../contexts/DiaryContext';
import Graph from '../components/Graph';
const Chart = () => {
    const title: string = "日記ページ"
    const　subtitle: string = "評価チャート"

    return (
    <>
        <GlobalStyle />
            <Container>
                <Content title={title} subtitle={subtitle}>
                    <DiaryProvider>
                        <Graph/> 
                    </DiaryProvider>
                </Content>
            </Container>
    </>
     );
};

export default Chart
