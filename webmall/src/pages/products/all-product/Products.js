// noinspection ES6CheckImport

/**
 * @Description Products Component
 * @author GYX xiao sb
 * @date 2023/3/30
 */

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetchProducts from '../../../api/fetchProducts'
import DisplayProducts from '../products-display/DisplayProducts'

const Products = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* initialize products */
    const [products, setProducts] = useState(null)
    /* Get Products hook(fake) */
    const {data, isLoading, error, isError} = useFetchProducts()
    
    /* Avoid too many requests */
    useEffect(() => {
        setProducts(data && data)
    }, [data])
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return (products && products.products.map((p, i) => {
        return (
            <DisplayProducts key={i} products={p}/>
        )
    }))
}
/**
 * End of Products Component
 */
export default Products