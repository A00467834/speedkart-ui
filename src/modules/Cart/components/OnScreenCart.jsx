import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/onScreenCart.module.css';

export const OnScreenCart = ({ onScreenCartItems }) => {
  const { totalItems, totalPrice } = onScreenCartItems;
  const navigate = useNavigate();
  return (
    <Button className={styles.OnScreenCartContainer} onClick={() => navigate('/cart')}>
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
  );
};
