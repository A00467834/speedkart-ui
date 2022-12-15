import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Product = () => {
    const navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate('/cart')}>Go to cart</button>
        </>
    )
}