import { combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/authSlice';

export const combineReducerProvider = () => {
    return {
       cart: cartReducer,
       user: authReducer
    }
};
const rootReducer = combineReducers(combineReducerProvider());

export default rootReducer;