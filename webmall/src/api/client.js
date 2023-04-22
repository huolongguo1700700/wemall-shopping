/**
 * @Description client Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { setCheckoutStatus } from '../stores/cart/cartSlice'

const URL = process.env.REACT_APP_API_URL
const ADMIN_URL = process.env.REACT_APP_ADMIN_URL

export async function fetchProducts() {
    return await axios.get(
        `${ADMIN_URL}/products?order=3&asc=1&all=true`
    ).then((res)=>  res.data.data)
}

export async function fetchCategories() {
    return await axios.get(
        `${ADMIN_URL}/categories?order=1&asc=1`
    ).then((res)=>res.data.data)
    .catch(e => {
        throw new Error(e.message)
    })
}

export async function fetchSingleProduct(id) {
    return await axios.get(
        `${ADMIN_URL}/product/${id}`
    ).then((res)=>res.data.data)
    .catch(e => {
        throw new Error(e.message)
    })
}


export async function fetchSingleCategory(id) {
    return await axios.get(
        `${ADMIN_URL}/category/${id}`
    ).then((res)=>res.data.data)
    .catch(e => {
        throw new Error(e.message)
    })
}

export const fetchProductsByCategory = async (categoryId) => {
    return await axios.get(
        `${ADMIN_URL}/categoryProducts?categoryId=${categoryId}`
    ).then((res) => res.data.data).catch(e => {
        throw new Error(e.message)
    })
}

// Fetch order by user
export  const fetchUserOrders = createAsyncThunk (
    'orders/fetchUserOrders',
    async (userId) => {
        return await  axios.get(`${URL}/orders/${userId}`)
        .then((res)=> {
            return res.data
        })
        .catch(e => {
            throw new Error(e.message)
        })
    }
)

// Fetch order by orderId
export async function fetchSingleOrder(orderId) {
    return await axios.get(
        `${URL}/order/${orderId}`
    ).then((res)=>res.data.data)
    .catch(e => {
        throw new Error(e.message)
    })
}

// Post order
export const postProductsToCart = createAsyncThunk (
    'cart/postCartToSever',
    async ({ carts, userId }, { getState, dispatch }) => {
        return await axios
        .post(`${URL}/checkout`, {
            carts,
            userId,
        })
        .then((res) => {
            setTimeout(() => {
                const currentState = getState()
                if (currentState.cart.status === 'succeeded') dispatch(setCheckoutStatus())
            }, 3000)
            return res.data
        })
        .catch((e) => {
            throw new Error(e.message)
        })
    }
)

axios.defaults.withCredentials = true

// Sign up/Register
export const userRegister = createAsyncThunk(
    "auth/userRegister",
    async ({ email, password, passwordConfirm }) => {
        return await axios
        .post(`${URL}/register`, {
            Email: email,
            Password: password,
            PasswordConfirm: passwordConfirm,
        })
        .then((res) => res.data)
        .catch((e) => {
            throw new Error(e.message)
        })
    }
)

// Sign in
export const userLogin = createAsyncThunk(
    "auth/userLogin",
    async ({ email, password }) => {
        return await axios
        .post(`${URL}/login`, {
            Email: email,
            Password: password,
        })
        .then((res) => res.data)
        .catch((e) => {
            throw new Error(e.message)
        })
    }
)

// Logout
export const userLogout = createAsyncThunk(
    "auth/userLogout",
    async () => {
        return await axios
        .get(`${URL}/logout`)
        .then((res) =>  res.data)
        .catch((e) => {
            throw new Error(e.message)
        })
    }
)