import { createSlice } from '@reduxjs/toolkit'
import { fetchSingleOrder, fetchUserOrders } from '../../api/client'

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        order: [],
        status: 'no-order',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserOrders.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.orders = action.payload.data
            state.error = null
        })
        builder.addCase(fetchUserOrders.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload.msg
        })
    },
})

export default orderSlice.reducer