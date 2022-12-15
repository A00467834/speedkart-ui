import { combineReducers } from 'redux';
// import authReducer from '../modules/registration/state/reducers/authRedcuer';
// import userDetailsReducer from '../modules/landing/state/reducers/userDetailsReducer';
// import themeReducer from './reducers/themeReducer';
// import notificationSaveStatusChangerReducer from '../modules/notifications/store/reducers/notificationStatusChanger';
// import setJwtReducer from '../modules/landing/state/reducers/jwtReducer';
import cartReducer from './reducers/cartReducer';

export const combineReducerProvider = () => {
    return {
       cart: cartReducer
    }
};

const rootReducer = combineReducers(combineReducerProvider());

export default rootReducer;