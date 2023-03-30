/**
 * @Description Products Component
 * @author GYX xiao sb
 * @date 2023/3/30
 */

import React, { useEffect, useState } from 'react'
import useFetchProducts from '../../../api/fetchProducts'
import DisplayProducts from '../products-display/DisplayProducts'

const Products = () => {
    /* initialize products */
    const [products, setProducts] = useState(null)
    /* Get Products hook(fake) */
    const {data, isLoading, error, isError} = useFetchProducts()
    
    /* Avoid too many requests */
    useEffect(()=>{
        setProducts(data && data)
    }, [data])
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) return {error}
    
    return (
        <div>
            {products && products.products.map(p => {
                return (
                    <DisplayProducts products={p} />
                )
            })}
        </div>
    )
}
/**
 * End of Products Component
 */
export default Products