import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import sortSlice from './sort/sortSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        sort: sortSlice,
    },
})

export default store