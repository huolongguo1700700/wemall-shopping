/**
 * @Description Main Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../../../api/client'
import useFetchProducts from '../../../../api/fetchProducts'
import ProductsContainer from '../../../products/products-display/ProductsContainer'
import ProductLists from '../../../products/products-display/ProductLists'
import LoadingSkeleton from '../../../skeletons/LoadingSkeleton'

const Collections = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    useFetchProducts()
    
    /* Get Products hook(fake) */
    const {data: products, isLoading, error, isError} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: Infinity,
    })
    
    /* Error and Loading states */
    if (isLoading) return < LoadingSkeleton/>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return products &&
        <Fragment>
            <ProductsContainer tags={[]} title={"Collections"}>
                <ProductLists products={products}/>
            </ProductsContainer>
        </Fragment>
}
/**
 * End of Main Component
 */
export default Collections