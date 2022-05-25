/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

 require('./bootstrap');

 /**
  * Next, we will create a fresh React component instance and attach it to
  * the page. Then, you may begin adding components to this application
  * or customize the JavaScript scaffolding to fit your unique needs.
  */
 
 import React from 'react';
 import ReactDOM from 'react-dom';
 import { BrowserRouter, Route ,Routes} from "react-router-dom";
 import ProvideAuth, { Private } from './contexts/AuthContexts';
 import Example from "./pages/Example";
 import Home from './pages/Home';
 import Login from './pages/Login';

 const App = () => {

    return(
        <ProvideAuth>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/home" element={<Private Component={Home} />} />
                    <Route path="/example" element={<Private Component={Example} />} />
                </Routes>
            </BrowserRouter>
        </ProvideAuth>
    );

    //  return (
    //     <BrowserRouter>
    //         <Routes>
    //             <Route path="/" element={<Home/>} />
    //             <Route path="/example" element={<Example/>} />
    //             <Route path="/login" element={<Login/>} />
    //         </Routes>
    //     </BrowserRouter>
    //  );
   };
 
   if (document.getElementById("app")) {
     ReactDOM.render(<App />, document.getElementById("app"));
     }
 