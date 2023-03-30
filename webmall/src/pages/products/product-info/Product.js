/**
 * @Description Product Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchProduct from '../../../api/fetchProduct'

const Product = () => {
    /* initialize a product */
    const [product, setProduct] = useState(null)
    
    /* Fetch parameter from link */
    const { productID } = useParams()
    
    const { data, isLoading, error, isError } = useFetchProduct(productID)
    
    /* Avoid too many requests */
    useEffect(()=>{
        setProduct(data && data)
    }, [data])
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) return {error}
    
    const info = product && product.product
    
    return (
        <div className="overflow-x-auto">
            {product &&
                <p>{JSON.stringify(info)}</p>
            }
        </div>
    )
}
/**
 * End of Product Component
 */
export default Product