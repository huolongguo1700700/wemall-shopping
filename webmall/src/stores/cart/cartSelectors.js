import { createSelector } from '@reduxjs/toolkit'

const selectCart = (state) => state.cart

export const selectCartItems = createSelector(selectCart, (cart) => cart.items)

export const selectCartTotal = createSelector(selectCartItems, (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0)
)

export const selectItemQty = (itemId) => createSelector(selectCartItems, (cartItems) => {
    const item = cartItems.find((i) => i.id === itemId)
    return item ? item.quantity : 0
})