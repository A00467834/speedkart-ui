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
import {Cart} from './modules/Cart';
// import { Checkout } from './modules/Checkout';

const App = (props) => {
  return (
    <>
      <Header /> 
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage {...props} />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/login" element={ <LoginPage/> } />
          <Route path="/register" element={ <RegisterPage/> } />
          <Route path="/landingPage" element={ <LandingPage/> } />
          {/* <Route path="/forget-password" element={ <ForgotPasswordPage/> } /> */}
          <Route exact path='/cart' element={<Cart />} />
          {/* <Route exact path='/checkout' element={<Checkout />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
