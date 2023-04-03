/**
 * @Description Products Component
 * @author GYX xiao sb
 * @date 2023/3/30
 */

import React, { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { fetchProducts } from '../../../api/client'
import useFetchProducts from '../../../api/fetchProducts'
import LoadingSkeleton from '../../skeletons/LoadingSkeleton'
import ProductsContainer from '../products-display/ProductsContainer'
import ProductLists from '../products-display/ProductLists'

const Products = () => {
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
export default Products