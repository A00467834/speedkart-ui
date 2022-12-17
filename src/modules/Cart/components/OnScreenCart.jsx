import React from 'react';
import { Button } from 'react-bootstrap';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { BiTimer } from 'react-icons/bi';
import styles from '../styles/onScreenCart.module.css';

export const OnScreenCart = ({ onScreenCartItems, onScreenActiveOrders }) => {
  const { totalItems, totalPrice } = onScreenCartItems;
  const { deliveryDatetime } = onScreenActiveOrders;

  const navigate = useNavigate();
  let timeInMin = 0;

  if (deliveryDatetime) {
    const deliveryTimeDate = new Date(`${deliveryDatetime}Z`).getTime();
    timeInMin = Math.floor((deliveryTimeDate - new Date().getTime()) / 1000 / 60);
  }

  return (
    <div className={styles.OnScreenCartContainer}>
      {timeInMin > 0 ? (
        <Button onClick={() => navigate('/orders')} className={styles.onScreenBtns}>
          <div>
            {/* {totalItems} items | {totalPrice}$ */}
            {timeInMin} minutes <BiTimer />
          </div>
          <div>
            <span>
              {' '}
              VIEW ORDERS <AiOutlineShoppingCart />
            </span>
          </div>
        </Button>
      ) : (
        <></>
      )}
      {totalItems ? (
        <Button onClick={() => navigate('/cart')} className={styles.onScreenBtns}>
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
      ) : (
        <></>
      )}
    </div>
  );
};
