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
import { ThemeProvider } from 'styled-components'
import './app.css'
import { lightTheme } from './styles/theme'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterInputForm from './components/RegisterInputForm';
import RegisterConfirmForm from './components/RegisterConfirmForm';
import RegisterCompleteForm from './components/RegisterCompleteForm';
import ProtectedRoute from './pages/ProtectedRoute';
import DiaryPage from './pages/DiaryPage';
import Products from './components/Products';
import Form from './components/Form'
import EditForm from './components/EditForm';
import Example from './pages/Example';


 const App = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element ={< LoginPage/>} />
                        <Route path="/register" element ={< RegisterPage/>} >
                            <Route path="input" element={<RegisterInputForm/>}/>
                            <Route path="confirm" element={<RegisterConfirmForm/>}/>
                            <Route path="complete" element={<RegisterCompleteForm/>}/>
                        </Route>
                        <Route path="/mypage" element={<ProtectedRoute/>}>
                            <Route path="diary" element={<DiaryPage/>}>
                                <Route path="home" element={<Products />} />
                                <Route path="product/new" element={<Form />} />
                                <Route path="product/edit/:id" element={<EditForm/>} />
                            </Route>
                            <Route path="example" element ={< Example/>} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
       
     );
};
 

ReactDOM.render(<App />, document.getElementById("app"));

