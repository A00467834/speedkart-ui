import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    onScreenCart: {}
  },
  reducers: {
    setCart: (state, action) => {
      state.cartItems =  action.payload
    },
    setOnScreenCart: (state, action) => {
        state.onScreenCart = action.payload
    }
  }
})

export const selectCart = state => state.cart.cartItems;
export const selectOnScreenCart = state => state.cart.onScreenCart;
export const { setCart, setOnScreenCart } = cartSlice.actions

export default cartSlice.reducer