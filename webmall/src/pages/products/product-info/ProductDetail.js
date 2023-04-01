/**
 * @Description Product Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchProduct from '../../../api/fetchProduct'
import TagsNavigation from '../../../features/category_navigation/TagsNavigation'
import useFetchCategoryProducts from '../../../api/fecthCategoryProducts'

const ProductDetail = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* Fetch parameter from link */
    const { productID, categoryID } = useParams()
    
    console.log(categoryID)
    
    const { data:product, isLoading, error, isError } = useFetchProduct(productID)
    const {data: cateProducts, isLoading:loading, error: cateError, isError: isCateError} = useFetchCategoryProducts(categoryID)
    /* Error and Loading states */
    if (isLoading || loading) return <span>Products Loading...</span>
    if (isError || isCateError) {
        console.log(error || cateError)
        navigate(`/Error`)
    }
    
    const info = product && product.product
    
    return product && cateProducts &&
        <div className="overflow-x-auto">
            <div>
                <TagsNavigation tags={cateProducts.categorySequence}/>
                {JSON.stringify(info)}
            </div>
        </div>
}
/**
 * End of Product Component
 */
export default ProductDetail