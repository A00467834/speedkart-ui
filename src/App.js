import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/Home';
import { Header } from './modules/Header';
import {Product} from './modules/Product';
import {LoginPage} from './modules/AuthModule/LoginPage';
import {RegisterPage} from './modules/AuthModule/RegisterPage';
import { LandingPage } from './modules/AuthModule/LandingPage';
// import {ForgotPasswordPage} from './modules/AuthModule/ForgotPasswordPage';

const App = () => {
  return (
    <>
      <Header /> 
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/login" element={ <LoginPage/> } />
          <Route path="/register" element={ <RegisterPage/> } />
          <Route path="/landingPage" element={ <LandingPage/> } />
          {/* <Route path="/forget-password" element={ <ForgotPasswordPage/> } /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
