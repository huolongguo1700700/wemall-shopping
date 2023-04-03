import { createSlice } from '@reduxjs/toolkit'

/* Initialize the state, if already exits in localStorage, fetch it */
const initialState = JSON.parse(localStorage.getItem('cart')) || { cart: [] }

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setItemQty: (state, action) => {
            const product = state.cart.find((item) => item.id === action.payload.id)
            /* Whether increase or decrease */
            action.payload.quantity > 0
                ? !product
                    /* Check whether product was in the cart. If no product inside, insert the data into cart */
                    ? state.cart.push({
                        id: action.payload.id,
                        name: action.payload.name,
                        price: action.payload.price,
                        image: action.payload.image,
                        quantity: action.payload.quantity,
                    })
                    /* If product already inside, update quantity value */
                    : product.quantity = action.payload.quantity
                /* If decrease quantity to 0 and product still exits, then delete it  */
                : product && (state.cart = state.cart.filter((item) => item.id !== action.payload.id))
            /* Store the cart data into the localStorage */
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
            /* Delete the specific cart product in the localStorage */
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeAllItems: (state) => {
            state.cart = []
            /* Delete all cart products in the localStorage */
            localStorage.removeItem('cart')
        },
    },
})

export const {
    setItemQty,
    removeItem,
    removeAllItems,
} = cartSlice.actions
export default cartSlice.reducer