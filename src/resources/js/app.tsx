import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Example from './pages/Example';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterInputForm from './components/RegisterInputForm'
import RegisterConfirmForm from './components/RegisterConfirmForm'
import RegisterCompleteForm from './components/RegisterCompleteForm'

const App = () => {

    return(
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
                        <Route path="example" element ={< Example/>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )

}

if (document.getElementById("app")){
    ReactDOM.render(<App />, document.getElementById("app"))
}