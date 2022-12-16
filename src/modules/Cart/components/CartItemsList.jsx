import Card from '@mui/material/Card';
import styles from '../styles/cartItemsList.module.css';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserId } from '../../../store/reducers/authSlice';
import { useEffect, useState } from 'react';
import axiosWrapper from '../../../apis/axiosCreate';
import {setCart} from '../../../store/reducers/cartReducer';

const cartItems = [
        {
            cartId: 4,
            customerId: 3,
            productId: 12,
            quantity: 1.00,
            createdDate: "2022-12-16T00:00:00",
            modifiedDate: "2022-12-16T00:00:00",
            subtotal: 60.00,
            productName: "Whmis - Spray Bottle Trigger",
            productImage: "https://media.istockphoto.com/id/941825878/photo/tomato-with-slice-isolated-with-clipping-path.jpg?s=612x612&w=0&k=20&c=P3PQlDAxzgx5i1hGCHKEcBy-rZmqn4f5CZPggWnh9yQ="
        },
        {
            cartId: 4,
            customerId: 3,
            productId: 12,
            quantity: 1.00,
            createdDate: "2022-12-16T00:00:00",
            modifiedDate: "2022-12-16T00:00:00",
            subtotal: 60.00,
            productName: "Whmis - Spray Bottle Trigger",
            productImage: "https://media.istockphoto.com/id/941825878/photo/tomato-with-slice-isolated-with-clipping-path.jpg?s=612x612&w=0&k=20&c=P3PQlDAxzgx5i1hGCHKEcBy-rZmqn4f5CZPggWnh9yQ="
        },
        {
            cartId: 4,
            customerId: 3,
            productId: 12,
            quantity: 1.00,
            createdDate: "2022-12-16T00:00:00",
            modifiedDate: "2022-12-16T00:00:00",
            subtotal: 60.00,
            productName: "Whmis - Spray Bottle Trigger",
            productImage: "https://media.istockphoto.com/id/941825878/photo/tomato-with-slice-isolated-with-clipping-path.jpg?s=612x612&w=0&k=20&c=P3PQlDAxzgx5i1hGCHKEcBy-rZmqn4f5CZPggWnh9yQ="
        }
]

export const CartItemsList = (props) => {
    const navigate = useNavigate();
    const customerId = useSelector(getUserId);
    // const [cartItems, setCartItems] = useState([]);

    const getCartItems = async () => {
        await axiosWrapper.get(`/Cart/getAllCartItems/${customerId}`).then((resp) => {
            // setCartItems(resp.data);
            setCart(resp.data)
        })
    }

    useEffect(() => {
        if (customerId) getCartItems()
    }, [customerId, getCartItems])

    return (
        <div className={styles.cartItemsListContainer}>
             {cartItems.map((item) => (
                <Card style={{margin: '8px'}}>
                    <div>
                        <CardMedia component="img" alt="green iguana" height="140" width="140" image={item.productImage} />
                    </div>
                    <CardActions style={{ justifyContent: 'space-between' }}>
                    <div>
                        <p style={{marginBottom: '0px'}}>{item.productName}</p>
                        <p style={{fontSize: '12px'}}>Quantity : {item.quantity}</p>
                    </div>
                    </CardActions>
                </Card>
            ) )} 
        </div>
    );

}