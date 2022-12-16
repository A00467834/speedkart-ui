import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: []
  },
  reducers: {
    setProducts: (state, action) => {
      state.products =  action.payload
    },
    updateProductQuantity: (state, action) => {
        state.products = state.products.map((prod) => {
            if (prod.productId === action.payload.productId) return {...prod, quantity: action.payload.quantity}
            return {...prod}
        })
    }
  }
})

export const getProducts = state => state.products.products
export const { setProducts, updateProductQuantity } = productsSlice.actions

export default productsSlice.reducer