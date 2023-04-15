import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import sortSlice from './sort/sortSlice'
import userSlice from './user/userSlice'
import orderSlice from './orders/oderSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        sort: sortSlice,
        user: userSlice,
        orders:orderSlice,
    },
})

export default store