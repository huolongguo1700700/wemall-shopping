/**
 * @Description client Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import axios from 'axios'

export async function fetchProducts() {
    return await axios.get(
        'http://localhost:8012/api/admin/products'
    ).then((res)=>res.data.data)
}

export async function fetchCategories() {
    return await axios.get(
        'http://localhost:8012/api/admin/categories'
    ).then((res)=>res.data.data)
    .catch(e => {
        throw new Error(e.message)
    })
}

export async function fetchSingleProduct(id) {
    return await axios.get(
        `http://localhost:8012/api/admin/product/${id}`
    ).then((res)=>res.data.data)
    .catch(e => {
        throw new Error(e.message)
    })
}

export async function fetchSingleCategory(id) {
    return await axios.get(
        `http://localhost:8012/api/admin/category/${id}`
    ).then((res)=>res.data.data)
    .catch(e => {
        throw new Error(e.message)
    })
}