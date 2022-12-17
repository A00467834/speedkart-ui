import { createSlice } from '@reduxjs/toolkit'

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    activeOrders: [],
    allOrders: []
  },
  reducers: {
    setOrders: (state, action) => {
      state.allOrders =  action.payload
    },
    setActiveOrders: (state, action) => {
        state.activeOrders = action.payload
    }
  }
})

export const getAllOrders = state => state.orders.allOrders;
export const getActiveOrders = state => state.orders.activeOrders;
export const { setOrders, setActiveOrders } = ordersSlice.actions

export default ordersSlice.reducer