import React from 'react';
import { useEffect, useState } from 'react';
import Styles from './BillDetails.module.css';

export const BillDetails = ({ items, priceObject }) => {
  const [allItems, setAllItems] = useState([]);
  const [priceObj, setPriceObj] = useState({});

//   const totalAmount = allItems.reduce((acc, curr) => acc + curr.subtotal, 0);
  // console.log(items);
  useEffect(() => {
    setAllItems(items);
  }, [items]);

  useEffect(() => {
    setPriceObj(priceObject);
  }, [priceObject])

  console.log(allItems, 'allItems');
  return (
    <div className={Styles.billDetailsContainer}>
      <h4>Bill Details</h4>
      <div className={Styles.checkoutBillItem}>
        <span>Product</span>
        <span>Price</span>
        <span>Qty</span>
        <span>Total</span>
      </div>
      {allItems.map((item) => (
        <div className={Styles.checkoutBillItem}>
          <span>{item.productName}</span>
          <span>{item.productPrice}</span>
          <span>{item.quantity}</span>
          <span>{item.subtotal}$</span>
        </div>
      ))}
      <div className={`${Styles.checkoutBillItem}`} style={{borderTop: '1px solid'}}>
          <span></span>
          <span></span>
          <span>Subtotal</span>
          <span>{priceObj.subTotal}$</span>
        </div>
        <div className={`${Styles.checkoutBillItem}`}>
          <span></span>
          <span></span>
          <span>Tax</span>
          <span>{priceObj.tax}$</span>
        </div>
        <div className={`${Styles.checkoutBillItem}`}>
          <span></span>
          <span></span>
          <span>Delivery Fee</span>
          <span>{priceObj.deliveryFee}$</span>
        </div>
        <div className={`${Styles.checkoutBillItem}`} style={{borderTop: '1px solid'}}>
          <span></span>
          <span></span>
          <span>To Pay</span>
          <span>{priceObj.toPay}$</span>
        </div>
    </div>
  );
};
