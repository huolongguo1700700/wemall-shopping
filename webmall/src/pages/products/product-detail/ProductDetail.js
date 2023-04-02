/**
 * @Description Product Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchProduct from '../../../api/fetchProduct'
import useFetchCategoryProducts from '../../../api/fecthCategoryProducts'
import ProductsContainer from '../products-display/ProductsContainer'

const ProductDetail = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* Fetch parameter from link */
    const { productID, categoryID } = useParams()
    
    const { data:product, isLoading, error, isError } = useFetchProduct(productID)
    const {data: cateProducts, isLoading:loading, error: cateError, isError: isCateError} = useFetchCategoryProducts(categoryID)
    /* Error and Loading states */
    if (isLoading || loading) return <span>Products Loading...</span>
    if (isError || isCateError) {
        console.log(error || cateError)
        navigate(`/Error`)
    }
    const info = product && product.product
    console.log(info.images)
    return product && cateProducts &&
        <ProductsContainer tags={cateProducts.categorySequence}>
            <div className="overflow-x-auto">
                <div>{info.name}</div>
                {info.images.length !==0 &&
                    <img src={info.images[1].url} alt={info.name}
                         className={`w-96 h-96 object-contain`}/>
                }
            </div>
        </ProductsContainer>
        
}
/**
 * End of Product Component
 */
export default ProductDetail