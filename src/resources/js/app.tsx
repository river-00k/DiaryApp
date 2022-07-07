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
 import { ThemeProvider } from 'styled-components'
 import AppRoutes from "./AppRoutes";
 import './app.css'
 import Content from "./components/Content"
 import Example from "./pages/Example"
 import Container from './styles/Container'
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
    if (!isThemeSet) return <div />
    return (
        
        <ThemeProvider theme={themeMode}>
            <FlashProvider>
                <AppRoutes />
            </FlashProvider>
        </ThemeProvider>
       
     );
};
 

ReactDOM.render(<App />, document.getElementById("app"));

