import React from 'react';
import { Filters } from './components/Filters';
import { ProductList } from './components/ProductList';
import { useSelector, useDispatch } from 'react-redux'
import { selectCart } from '../../store/reducers/cartReducer';
import {setCart} from '../../store/reducers/cartReducer'
import { useEffect } from 'react';

export const HomePage = (props) => {
  console.log(props);
  const cartItem = useSelector(selectCart);
  console.log(cartItem);
  const dispatch = useDispatch();

  
  
  return (
    <div>
      <Filters />
      <div style={{ padding: '10px' }}>
        <ProductList {...props} />
        <button onClick={() => dispatch(setCart([{new: '1'}]))}>new</button>
      </div>
    </div>
  );
};
