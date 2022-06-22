/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

 //require('./bootstrap');

 /**
  * Next, we will create a fresh React component instance and attach it to
  * the page. Then, you may begin adding components to this application
  * or customize the JavaScript scaffolding to fit your unique needs.
  */
 
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter, Route ,Routes} from "react-router-dom";
 import DiaryRoutes from "./DiaryRoutes";
 import './app.css'
 import Content from "./components/Content"
 import Example from "./pages/Example"
 import Container from './styles/Container'
 import { ThemeProvider } from 'styled-components'
 import useDarkMode from './hooks/useDarkMode'
 import { lightTheme, darkTheme } from './styles/theme'
 import ThemeButton from './components/ThemeButton'
 import GlobalStyle from './styles/GlobalStyle'
 import Background from './layout/Background'
 import { FlashProvider } from "./components/FlashContext";
 //import Home from './pages/Home';
 const App = () => {
    const { theme, toggleTheme, isThemeSet } = useDarkMode()
    const themeMode = theme === 'light' ? lightTheme : darkTheme
    // wait till theme has been set to prevent initializing with one theme and
    // immediately switching, creating a flash, to another based on user
    // preference
    if (!isThemeSet) return <div />
    
    return (
    <ThemeProvider theme={themeMode}>
     <GlobalStyle />
     <FlashProvider>
      <Background>
        <Container>

            <ThemeButton
              theme={theme}
              toggleTheme={toggleTheme}
              className="mb-8"
            />
            <Content>
                <DiaryRoutes />
            </Content>
        </Container>
      </Background>
     </FlashProvider>
    </ThemeProvider>
     );
};
 

ReactDOM.render(<App />, document.getElementById("app"));

