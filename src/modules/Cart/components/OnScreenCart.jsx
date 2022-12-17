import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/onScreenCart.module.css';

export const OnScreenCart = ({ onScreenCartItems, onScreenActiveOrders }) => {
  const { totalItems, totalPrice } = onScreenCartItems;
  const navigate = useNavigate();
  return (
    <div className={styles.OnScreenCartContainer}>
    <Button className= {styles.buttonMargin} onClick={() => navigate('/cart')}>
      <div>
        {totalItems} items | {totalPrice}$
      </div>
      <div>
        <span>
          {' '}
          VIEW ORDERS <AiOutlineShoppingCart />
        </span>
      </div>
    </Button>
    <Button className= {styles.buttonMargin} onClick={() => navigate('/cart')}>
      <div>
        {totalItems} items | {totalPrice}$
      </div>
      <div>
        <span>
          {' '}
          VIEW CART <AiOutlineShoppingCart />
        </span>
      </div>
    </Button>
    </div>
  );
};
