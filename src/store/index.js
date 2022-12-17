import { combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authSlice';
import productsReducer from './reducers/productsSlice'; 
import ordersReducer from './reducers/ordersSlice';

export const combineReducerProvider = () => {
    return {
       cart: cartReducer,
       user: authReducer,
       products: productsReducer,
       orders: ordersReducer
    }
};
const rootReducer = combineReducers(combineReducerProvider());

export default rootReducer;