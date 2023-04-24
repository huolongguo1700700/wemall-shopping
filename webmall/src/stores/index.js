import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import sortSlice from './sort/sortSlice'
import userSlice from './user/userSlice'
import orderSlice from './orders/orderSlice'
import pageSlice from './page/pageSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        sort: sortSlice,
        user: userSlice,
        orders:orderSlice,
        page: pageSlice,
    },
})

export default store