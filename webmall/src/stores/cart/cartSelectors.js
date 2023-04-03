import { createSelector } from '@reduxjs/toolkit'

/* Select all products */
export const selectAll = (state) => state.cart.cart

/* Select first 2 product items */
export const selectForShowing = createSelector(selectAll, (product) => product.slice(0, 2))

/* Select for shopping-cart display: how many types of products user picked */
export const selectProductCount = createSelector(selectAll, (product) => product.length)

/* Calculate the entire price for user */
export const selectTotalPrice = createSelector(selectAll,
    (products) => products.reduce((total, p) => total + p.price * p.quantity, 0)
)

/* Select the specific product */
export const selectProduct = (productId) => createSelector(selectAll,
    (product) => product.find((p) => p.id === productId)
)

export const selectProductQty = (productId) => createSelector(selectProduct(productId),
    (p) => (p ? p.quantity : 0)
)