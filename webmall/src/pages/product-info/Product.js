/**
 * @Description Product Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { fetchSingleProduct } from '../../api/client'

const Product = () => {
    /* Fetch parameter from link */
    const { productID } = useParams()
    
    /* Using the query hook to fetch single Product info from API */
    const product = useQuery({queryKey:['product'], queryFn: () => fetchSingleProduct(productID)})
    
    /* Error and Loading states */
    if (product.isLoading) return <span>Single Loading...</span>
    if (product.isError) return <span>Error: {product.error}</span>
    
    //Print out all info in string
    const info = product.data.data.product
    
    return (
        <div>
            <p>{JSON.stringify(info)}</p>
        </div>
    )
}
/**
 * End of Product Component
 */
export default Product