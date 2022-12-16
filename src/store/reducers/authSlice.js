import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'userData',
  initialState: {
    user: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user =  action.payload
    }
  }
})

export const getUser = state => state.user.user;
export const getUserId = state => state.user.user.customerId;
export const { setUser } = authSlice.actions

export default authSlice.reducer