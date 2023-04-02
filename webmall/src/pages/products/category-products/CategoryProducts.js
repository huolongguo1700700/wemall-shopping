/**
 * @Description CategoryProducts Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React, { Fragment } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchCategoryProducts from '../../../api/fecthCategoryProducts'
import ProductsContainer from '../products-display/ProductsContainer'
import ProductLists from '../products-display/ProductLists'

const CategoryProducts = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const {categoryID} = useParams()
    const navigate = useNavigate()
    
    /* Get Products hook(fake) */
    const {data: cateProducts, isLoading, error, isError} = useFetchCategoryProducts(categoryID)
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return cateProducts &&
        <Fragment>
            <ProductsContainer tags={cateProducts.categorySequence}>
                <ProductLists products={cateProducts}/>
            </ProductsContainer>
        </Fragment>
}
/**
 * End of CategoryProducts Component
 */
export default CategoryProducts