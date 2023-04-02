import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        /* Increase or decrease in shopping cart */
        setItemQty: (state, action) => {
            /* Get product info and quantity to increase or decrease */
            const { id, quantity, productInfo } = action.payload
            const existingItemIndex = state.items.findIndex((item) => item.id === id)
            if (existingItemIndex >= 0) {
                quantity > 0 ?
                    state.items[existingItemIndex].quantity = quantity
                :
                    state.items.splice(existingItemIndex, 1)
            }
            else quantity > 0 && state.items.push({ id, quantity, productInfo })
        },
        
        /* Remove one product */
        removeItem: (state, action) => {
            const index = state.items.findIndex((item) => item.id === action.payload)
            if (index >= 0) state.items.splice(index, 1)
        },
        
        /* Delete all products in shopping cart */
        removeAllItems: (state) => {
            state.items = []
        },
    },
})

export const {
    setItemQty,
    removeItem,
    removeAllItems,
} = cartSlice.actions
export default cartSlice.reducer