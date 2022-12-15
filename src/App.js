import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './modules/Home';
import { Header } from './modules/Header';
import {Product} from './modules/Product';
import {Cart} from './modules/Cart';
import { Checkout } from './modules/Checkout';

const App = (props) => {
  return (
    <>
      <Header /> 
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage {...props} />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/checkout' element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
