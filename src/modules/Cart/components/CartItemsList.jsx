import Card from '@mui/material/Card';
import styles from '../styles/cartItemsList.module.css';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserId } from '../../../store/reducers/authSlice';
import { useEffect, useState } from 'react';
import axiosWrapper from '../../../apis/axiosCreate';
import { setCart, selectCart } from '../../../store/reducers/cartReducer';
import { Button } from 'react-bootstrap';

export const CartItemsList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customerId = useSelector(getUserId);
  const cartItems = useSelector(selectCart);

  const getCartItems = async () => {
    await axiosWrapper.get(`/Cart/getAllCartItems/${customerId}`).then((resp) => {
      dispatch(setCart(resp.data));
    });
  };

  const updateCart = async (product, add) => {
    let { productId, quantity, productPrice } = product;
    if (add) {
      quantity += 1;
    } else {
      quantity -= 1;
    }

    if (quantity > 0) {
      await axiosWrapper
        .post(`/Cart/updateCart`, {
          productId,
          quantity,
          productPrice,
          customerId: customerId,
        })
        .then((resp) => {
          getCartItems();
        });
    } else {
      await axiosWrapper
        .delete(`/Cart/removeItem?customerId=${customerId}&productId=${productId}`)
        .then((resp) => {
          getCartItems();
        });
    }
  };

  useEffect(() => {
    if (customerId) getCartItems();
  }, [customerId]);

  return (
    <div className={styles.cartItemsListContainer}>
        <h2>Your Cart</h2>
      {cartItems.map((product) => (
        <Card style={{ margin: '8px' }}>
          <div>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              width="140"
              image={product.productImage}
            />
          </div>
          <CardActions style={{ justifyContent: 'space-between' }}>
            <div>
              <p style={{ marginBottom: '0px' }}>{product.productName}</p>
              <p style={{ fontSize: '12px', marginBottom: '0px' }}>500g</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{product.subtotal}$</p>
            </div>
            <div
              style={{
                background: product.quantity > 0 ? '#2587be' : 'transparent',
                color: product.quantity > 0 ? 'white' : 'black',
                textAlign: 'center',
                display: 'flex',
                border: `1px solid ${product.quantity > 0 ? 'white' : 'black'}`,
                borderRadius: '10px',
              }}
            >
              <button
                className={styles.cartModifyBtn}
                style={{ borderRight: `2px solid ${product.quantity > 0 ? 'white' : 'black'}` }}
                onClick={(e) => {
                  e.stopPropagation();
                  updateCart(product);
                }}
              >
                -
              </button>
              <span style={{ padding: '5px' }}>{product.quantity}</span>
              <button
                className={styles.cartModifyBtn}
                style={{ borderLeft: `2px solid ${product.quantity > 0 ? 'white' : 'black'}` }}
                onClick={(e) => {
                  e.stopPropagation();
                  updateCart(product, true);
                }}
              >
                +
              </button>
            </div>
          </CardActions>
        </Card>
      ))}
      <Button style={{ width: '100%' }} onClick={() => navigate('/checkout')}>
        Checkout ({Math.round(cartItems.reduce((acc, curr) => acc + curr.subtotal, 0) * 100)/100}$)
      </Button>
    </div>
  );
};
