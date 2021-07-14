import { configureStore } from '@reduxjs/toolkit'
import orderReducer from './slices/orderSlice'
import authReducer from './slices/authSlice'
export const store = configureStore({
  reducer: {
    cart: orderReducer,
    auth: authReducer
  },
})