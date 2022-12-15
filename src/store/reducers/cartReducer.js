// const INITIAL_STATE = {
//     cartItems: []
// }
// const cartReducer = (state = INITIAL_STATE, action ) => {
//     switch(action.type) {
//         case 'SET CART ITEMS' : 
//             state = {...state, cartItems: action.payload}
//             break;
//         default:
//             state = {
//                 ...state
//             }
//     }

//     return state;
// }

// export default cartReducer;


import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    setCart: (state, action) => {
      state.cartItems =  action.payload
    }
  }
})

export const selectCart = state => {console.log(state, 'state'); return state.cart.cartItems}
export const { setCart } = cartSlice.actions

export default cartSlice.reducer