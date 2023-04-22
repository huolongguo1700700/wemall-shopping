import { createSlice } from '@reduxjs/toolkit'
import { fetchUserOrders } from '../../api/client'

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        orderID: 0,
        status: 'no-order',
        error: null,
    },
    reducers: {
        setOrderID: (state, action) => {
            state.orderID = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrders.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
            if(action.payload.data){
                state.status = 'succeeded'
                state.orders = action.payload.data
                state.error = null
            }
            else {
                state.status = 'succeeded'
                state.orders = []
                state.error = null
            }
        })
        builder.addCase(fetchUserOrders.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.msg
        })
    },
})
export const { setOrderID } = orderSlice.actions

export default orderSlice.reducer