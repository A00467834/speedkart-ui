import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import styles from '../styles/onScreenCart.module.css';

export const OnScreenCart = ({onScreenCartItems}) => {

    const {totalItems, totalPrice} = onScreenCartItems;
  return (
    <Button className={styles.OnScreenCartContainer}>
      <div>{totalItems} items | {totalPrice}$</div>
      <div>
        <span>
          {' '}
          VIEW CART <AiOutlineShoppingCart />
        </span>
      </div>
    </Button>
  );
};
