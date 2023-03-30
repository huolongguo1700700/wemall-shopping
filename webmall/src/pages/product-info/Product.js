/**
 * @Description Product Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useGetProduct from '../../api/getProduct'

const Product = () => {
    /* initialize a product */
    const [product, setProduct] = useState(null)
    
    /* Fetch parameter from link */
    const { productID } = useParams()
    
    const { data, isLoading, error, isError } = useGetProduct(productID)
    
    /* Avoid too many requests */
    useEffect(()=>{
        setProduct(data && data)
    }, [data])
    
    //Print out all info in string
    
    const info = product && product.product
    
    return (
        <div className="overflow-x-auto">
            {   /* Error and Loading states */
                isLoading ? <span>Categories Loading...</span> : isError && <span>Error: {error}</span>
            }
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