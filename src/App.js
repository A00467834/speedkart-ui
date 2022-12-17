import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/Home';
import { Header } from './modules/Header';
import { Product } from './modules/Product';
import { LoginPage } from './modules/AuthModule/LoginPage';
import { RegisterPage } from './modules/AuthModule/RegisterPage';
import { LandingPage } from './modules/AuthModule/LandingPage';
// import {ForgotPasswordPage} from './modules/AuthModule/ForgotPasswordPage';
import { Cart } from './modules/Cart';
import { Checkout } from './modules/Checkout';
import { CartItemsList } from './modules/Cart/components/CartItemsList';
import { OrderHistory } from './modules/Orders/components/OrderHistory';

const App = (props) => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage {...props} />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route exact path="/cart" element={<CartItemsList />} />
          <Route exact path="/orders" element={<OrderHistory />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
