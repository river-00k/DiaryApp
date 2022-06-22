 import React from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter, Outlet, Route ,Routes} from "react-router-dom";
 import AppRoutes from "../AppRoutes";
 import '../app.css'
 import Content from "../components/Content"
 import Example from "../pages/Example"
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
    if (!isThemeSet) return <div />
    
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
                <Outlet/>
            </Content>
        </Container>
      </Background>
      </>
     );
};

export default DiaryPage