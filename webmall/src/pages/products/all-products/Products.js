/**
 * @Description Products Component
 * @author GYX xiao sb
 * @date 2023/3/30
 */

import React, { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchProducts } from '../../../api/client'
import useFetchProducts from '../../../api/fetchProducts'
import LoadingSkeleton from '../../skeletons/LoadingSkeleton'
import ProductsContainer from '../products-display/ProductsContainer'
import ProductLists from '../products-display/ProductLists'
import { selectSortMethod } from '../../../stores/sort/sortSelectors'
import { sortFunction } from '../products-display/sorting-products'

const Products = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    const sortMethod = useSelector(selectSortMethod)
    
    /* Pre-fetching */
    useFetchProducts()
    
    /* Get Products hook(fake) */
    const {data: products, isLoading, error, isError} = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: Infinity,
    })
    
    /* Sorted products */
    const sortedProducts = sortFunction(products && products.products, sortMethod)
    
    /* Error and Loading states */
    if (isLoading) return < LoadingSkeleton/>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return products &&
        <Fragment>
            <ProductsContainer tags={[]} title={"Collections"}>
                <ProductLists products={sortedProducts}/>
            </ProductsContainer>
        </Fragment>
}
/**
 * End of Main Component
 */
export default Products