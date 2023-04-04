/**
 * @Description client Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import axios from 'axios'

const ADMIN_URL = process.env.REACT_APP_ADMIN_URL

console.log(process.env.REACT_APP_ADMIN_URL)

export async function fetchProducts() {
    return await axios.get(
        `${ADMIN_URL}/products?order=3&asc=1&all=true`
    ).then((res)=>res.data.data)
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