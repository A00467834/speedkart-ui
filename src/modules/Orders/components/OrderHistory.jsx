import Card from '@mui/material/Card';
import styles from '../styles/orderHistory.module.css';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';

const orderHistory = [
    {
        orderHeadId: 1,
        customerId: 3,
        orderStatus: "paymentsuccess",
        amount: 270.00,
        deliveryDatetime: "2022-12-16T11:30:13.293",
        createdDate: "2022-12-16T00:00:00",
        modifiedDate: "2022-12-16T00:00:00"
    },
    {
        orderHeadId: 1,
        customerId: 3,
        orderStatus: "paymentsuccess",
        amount: 270.00,
        deliveryDatetime: "2022-12-16T11:30:13.293",
        createdDate: "2022-12-16T00:00:00",
        modifiedDate: "2022-12-16T00:00:00"
    }
] 

export const OrderHistory = (props) => {
    const navigate = useNavigate();

    return (
        <div className={styles.orderHistoryContainer}>
             {orderHistory.map((order) => (
                <Card style={{margin: '8px'}}>
                    <CardActions style={{ justifyContent: 'space-between' }}>
                    <div>
                        <p style={{marginBottom: '0px'}}>Order Id : {order.orderHeadId}</p>
                        <p style={{marginBottom: '0px'}}>Order Status : {order.orderStatus}</p>
                        <p style={{fontSize: '12px'}}>Amount : {order.amount}</p>
                    </div>
                    </CardActions>
                </Card>
            ) )} 
        </div>
    );

}