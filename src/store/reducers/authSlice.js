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

export const getUser = state => {console.log(state, 'state'); return state.userData.user}
export const { setUser } = authSlice.actions
export default authSlice.reducer