import {React} from 'react';
import {useNavigate} from 'react-router-dom';

export const Cart = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate('/checkout')}>Checkout</button>
        </>
    )
}