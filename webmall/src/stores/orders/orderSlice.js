import { createSlice } from '@reduxjs/toolkit'
import { deleteOrder, fetchUserOrders } from '../../api/client'

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
        builder
            /* Orders GET Request */
            .addCase(fetchUserOrders.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchUserOrders.fulfilled, (state, action) => {
                if(action.payload.errNo===0) {
                    if (action.payload.data) {
                        state.status = 'succeeded'
                        state.orders = action.payload.data
                        state.error = null
                    }
                    else {
                        state.status = 'succeeded'
                        state.orders = []
                        state.error = null
                    }
                }
                else if(action.payload.errNo===1){
                    state.status = "failed"
                    state.error = action.payload.msg
                }
            })
            .addCase(fetchUserOrders.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload.msg
            })
            /* Delete order GET Request */
            .addCase(deleteOrder.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                if(action.payload.errNo===0){
                    state.status = 'succeeded'
                    state.orderID = action.payload.data.id
                    state.error = null
                }
                else if(action.payload.errNo===1){
                    state.status = "failed"
                    state.error = action.payload.msg
                }
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
        
    },
})
export const { setOrderID } = orderSlice.actions

export default orderSlice.reducer