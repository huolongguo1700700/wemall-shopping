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
import { useQuery } from '@tanstack/react-query'
import { fetchProductsByCategory, fetchSingleProduct } from '../../../api/client'
import AddCart from '../../../features/add-to-cart/AddCart'

const ProductDetail = () => {
    
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* Fetch parameter from link */
    const { productID, categoryID } = useParams()
    
    useFetchCategoryProducts(categoryID)
    useFetchProduct(productID)
    
    /* Calling request API function and keep data by useQuery */
    const { data:product, isLoading, error, isError } = useQuery({
        queryKey:['product', productID],
        queryFn:() => fetchSingleProduct(productID),
         staleTime: Infinity
    })
    
    const {data: cateProducts, isLoading:loading, error: cateError, isError: isCateError} = useQuery({
        queryKey:['cate-products', categoryID],
        queryFn: () => fetchProductsByCategory(categoryID),
        staleTime: Infinity
    })
    
    /* Error and Loading states */
    if (isLoading || loading) return <span></span>
    if (isError || isCateError) {
        console.log(error || cateError)
        navigate(`/Error`)
    }
    const info = product && product.product
    
    return product && cateProducts &&
        <ProductsContainer tags={cateProducts.categorySequence} title={info.name}>
            <div className="w-full bg-white flex flex-col justify-center items-center gap-5 ">
                <div className={`min-w-[32rem]  min-h-[32rem] bg-white`}>
                    {info.images.length !==0 &&
                        <img src={info.images[1].url} alt={info.name}
                             className={`w-[32rem] h-[32rem] object-contain `}/>
                    }
                </div>
                <div>{info.price} €</div>
                <AddCart product={info} url={info.images && info.images.length !==0 ? info.images[0].url : ''} disabled={false} />
                <div className={`my-12`}>
                    {info.detail}
                </div>
                
            </div>
            
            {/* To top button */}
            {/*<svg className="rotate-180 w-6 h-6 border border-lime-800 rounded-full cursor-pointer" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>*/}
        </ProductsContainer>
}

/**
 * End of Product Component
 */
export default ProductDetail