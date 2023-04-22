/**
 * @Description Products Component
 * @author GYX xiao sb
 * @date 2023/3/30
 */

import React, { Fragment } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { fetchProducts } from '../../../api/client'
import useFetchProducts from '../../../api/fetchProducts'
import LoadingSkeleton from '../../skeletons/LoadingSkeleton'
import ProductsContainer from '../products-display/ProductsContainer'
import ProductLists from '../products-display/ProductLists'
import { selectSortMethod } from '../../../stores/sort/sortSelectors'
import { sortFunction } from '../products-display/sorting-products'
import Pagination from '../products-display/Pagination'
import { selectItemsPerPage } from '../../../stores/page/pageSelectors'

const Products = () => {
    const location = useLocation()
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
    
    /* Reducer for pagination */
    const [searchParams] = useSearchParams()
    const page = searchParams.get("page")
    const currentPage = page ? parseInt(page, 10) : 1
    const itemsPerPage = useSelector(selectItemsPerPage)
    
    const totalPages = sortedProducts && Math.ceil(sortedProducts.length / itemsPerPage)
    
    // Items to display in current page
    const paginatedProducts = sortedProducts && sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    
    /* Error and Loading states */
    if (isLoading) return < LoadingSkeleton/>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    
    return products &&
        <Fragment>
            <ProductsContainer tags={[]} title={"Collections"}>
                <ProductLists products={paginatedProducts}/>
            </ProductsContainer>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                baseUrl={location.pathname}
            />
        </Fragment>
}
/**
 * End of Main Component
 */
export default Products