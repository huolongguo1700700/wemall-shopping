import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import sortSlice from './sort/sortSlice'
import userSlice from './user/userSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        sort: sortSlice,
        user: userSlice,
    },
})

export default store