import { combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authSlice';
import productsReducer from './reducers/productsSlice'; 

export const combineReducerProvider = () => {
    return {
       cart: cartReducer,
       user: authReducer,
       products: productsReducer
    }
};
const rootReducer = combineReducers(combineReducerProvider());

export default rootReducer;