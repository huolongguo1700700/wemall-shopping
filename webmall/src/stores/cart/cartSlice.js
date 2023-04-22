import { createSlice } from '@reduxjs/toolkit'
import { postProductsToCart } from '../../api/client'

/* Initialize the state, if already exits in localStorage, fetch it */
const initialState = JSON.parse(localStorage.getItem('cart')) || {
    cart: [],
    status: "checkout",
    error: null
}

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
        setCheckoutStatus: (state) => {
            state.status = 'checkout'
        }
    },
    extraReducers (builder) {
        builder.addCase(postProductsToCart.pending, (state) => {
            state.status = "processing"
        })
        builder.addCase(postProductsToCart.fulfilled, (state, action) => {
            if(action.payload.errNo===0) {
                state.status = "succeeded"
                state.cart = []
                localStorage.removeItem('cart')
            }
            else if(action.payload.errNo===1){
                state.status = "failed"
                state.error = action.payload.msg
            }
        })
        builder.addCase(postProductsToCart.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    }
})

export const {
    setItemQty,
    removeItem,
    removeAllItems,
    setCheckoutStatus
} = cartSlice.actions
export default cartSlice.reducer