import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './Components/User/Signup/Register';
import Home from './Components/User/Home';
import Login from './Components/User/Login/Login';
import ForgotPassword from './Components/User/ForgotPassword/ForgotPassword';
import SetNewPassword from './Components/User/NewPassword/SetNewPassword';
const root = ReactDOM.createRoot(document.getElementById('root'));
function App(){
  return(
    <BrowserRouter>
      <Routes>
        {/* <Route index path='/' element={<Country/>}></Route> */}
        <Route inedx path='/' element={<Register/>}></Route>
        <Route inedx path='/login' element={<Login/>}></Route>
        <Route inedx path='/forgotpassword' element={<ForgotPassword/>}></Route>
        <Route inedx path='/newpassword' element={<SetNewPassword/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
