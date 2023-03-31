/**
 * @Description client Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import axios from 'axios'
import { ADMIN_URL } from './api'


export async function fetchProducts() {
    return await axios.get(
        `${ADMIN_URL}/products`
    ).then((res)=>res.data.data)
}

export async function fetchCategories() {
    return await axios.get(
        `${ADMIN_URL}/categories`
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
        `${ADMIN_URL}/category-products?category_id=${categoryId}`
    ).then((res) => res.data.data).catch(e => {
        throw new Error(e.message)
    })
}