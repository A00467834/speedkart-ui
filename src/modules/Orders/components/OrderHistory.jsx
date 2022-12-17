import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import styles from '../styles/orderHistory.module.css';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {RiArrowDownSLine} from 'react-icons/ri'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserId } from '../../../store/reducers/authSlice';
import axiosWrapper from '../../../apis/axiosCreate';

export const OrderHistory = (props) => {
  const customerId = useSelector(getUserId);
  const [allOrders, setAllOrders] = useState([]);

  const [expanded, setExpanded] = useState(null);


  const getAllOrders = async () => {
    await axiosWrapper.get(`/order/orderHistory/${customerId}`).then((resp) => {
      setAllOrders(resp.data);
    });
  };

  useEffect(() => {
    if (customerId) getAllOrders();
  }, [customerId]);

  return (
    <div style={{paddingTop: '20px'}}>
    <h2>My Orders</h2>
    <div className={styles.orderHistoryContainer}>
      {allOrders.map((order) => (
        <Accordion
          expanded={expanded === order.orderHead.orderHeadId}
          onChange={() =>
            setExpanded(
              expanded === order.orderHead.orderHeadId ? null : order.orderHead.orderHeadId,
            )
          }
        >
          <AccordionSummary
            expandIcon={<RiArrowDownSLine />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography style={{textAlign: 'center'}} sx={{ width: '40%', flexShrink: 0 }}>
              <p>Order Id</p> <p>{order.orderHead.orderHeadId}</p>
            </Typography>
            <Typography style={{textAlign: 'center'}} sx={{ width: '40%', color: 'text.secondary' }}>
              <p>Amount</p> <p>{order.orderHead.amount}$</p>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.checkoutBillItem}>
              <span>Product</span>
              {/* <span>Price</span> */}
              <span>Qty</span>
              {/* <span>Total</span> */}
            </div>
            {order.orderItems?.map((item) => (
              <div className={styles.checkoutBillItem}>
                <span>{item.productName}</span>
                {/* <span>{item.productPrice}</span> */}
                <span>{item.quantity}</span>
                {/* <span>{item.subtotal}$</span> */}
              </div>
            ))}
            {order.orderHead.orderStatus === "paymentsuccess" ? (
            <div style={{marginTop: '10px', textAlign: 'center'}}>
                <span>Estimated delivery: {Math.floor((((new Date(`${order.orderHead.deliveryDatetime}Z`).getTime()) - (new Date().getTime()))/ 1000) / 60)} mins</span>
            </div>
            ) : (<></>)}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
    </div>
  );
};
