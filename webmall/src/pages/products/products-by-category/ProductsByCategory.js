/**
 * @Description ProductsByCategory Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React, { Fragment } from 'react'
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { selectSortMethod } from '../../../stores/sort/sortSelectors'
import useFetchCategoryProducts from '../../../api/fecthCategoryProducts'
import ProductsContainer from '../products-display/ProductsContainer'
import ProductLists from '../products-display/ProductLists'
import { fetchProductsByCategory } from '../../../api/client'
import { sortFunction } from '../products-display/sorting-products'
import { selectItemsPerPage } from '../../../stores/page/pageSelectors'
import Pagination from '../products-display/Pagination'

const ProductsByCategory = () => {
    const sortMethod = useSelector(selectSortMethod)
    const location = useLocation()
    
    /* Use Router to transfer parameters and navigate to Error page */
    const {categoryID} = useParams()
    const navigate = useNavigate()
    
    /* Pre-fetching */
    useFetchCategoryProducts(categoryID)
    
    /* Calling request API function and keep data by useQuery */
    const {data: cateProducts, isLoading, error, isError} = useQuery({
            queryKey:['cate-products', categoryID],
            queryFn: () => fetchProductsByCategory(categoryID),
            staleTime: Infinity
    })
    
    /* Sorted products */
    const sortedProducts = sortFunction(cateProducts && cateProducts.products, sortMethod)
    
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
    if (isLoading) return <span></span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return cateProducts &&
        <Fragment>
            <ProductsContainer tags={cateProducts.categorySequence} title={cateProducts.categorySequence.slice(-1)[0].name}>
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
 * End of ProductsByCategory Component
 */
export default ProductsByCategory