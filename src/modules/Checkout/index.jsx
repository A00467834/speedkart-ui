import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserId } from '../../store/reducers/authSlice';
import { selectCart } from '../../store/reducers/cartReducer';
import { BillDetails } from './components/BillDetails';
import CardPayment from './components/CardPayment';
import axiosWrapper from '../../apis/axiosCreate';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

Date.prototype.addHours = function (h) {
  this.setHours(this.getHours() + h);
  return this;
};

export const Checkout = () => {
  const cartItems = useSelector(selectCart);
  const customerId = useSelector(getUserId);
  const [priceObj, setPriceObj] = useState({
    subTotal: 0,
    tax: 0,
    deliveryFee: 20,
    toPay: 0,
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems && cartItems.length) {
      let subTotal =
        Math.round(cartItems.reduce((acc, curr) => acc + curr.subtotal, 0) * 100) / 100;
      let tax = Math.round(subTotal * 0.15 * 100) / 100;
      let toPay = Math.round((subTotal + tax + priceObj.deliveryFee) * 100) / 100;
      setPriceObj((prev) => ({ ...prev, subTotal, tax, toPay }));
    }
  }, [cartItems]);

  const onPayClick = async ({ paymentType }) => {
    const deliveryDateTime = new Date().addHours(1).toISOString();
    const payloadCartItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      cartId: item.cartId,
    }));
    const bodyPayload = {
      orderStatus: 'paymentsuccess',
      cartDetails: payloadCartItems,
      amount: priceObj.toPay,
      customerId,
      paymentType,
      deliveryDateTime,
    };
    await axiosWrapper.post('/order/placeOrder', bodyPayload).then((resp) => {
      setOrderPlaced(true);
    });
  };

  return (
    <div>
      {orderPlaced ? (
        <SweetAlert success title="Payment Successfull!" onConfirm={() => navigate('/')}>
          Your order has been placed!
        </SweetAlert>
      ) : (
        <></>
      )}
      <BillDetails items={cartItems} priceObject={priceObj} />
      <CardPayment
        onPayClick={(val) => {
          console.log(val);
          onPayClick(val);
        }}
      />
    </div>
  );
};
