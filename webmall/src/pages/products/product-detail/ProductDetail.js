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
import ProductCard from '../products-display/ProductCard'

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
    const recommendCategoryId = cateProducts && cateProducts.categorySequence[0].id
    
    const {data: recommend, isLoading:recLoading, error: recError, isError: isRecError} = useQuery({
        queryKey:['cate-products', recommendCategoryId],
        queryFn: () => fetchProductsByCategory(recommendCategoryId),
        staleTime: Infinity
    })
    
    console.log(recommend && recommend.products)
    
    /* Error and Loading states */
    if (isLoading || loading || recLoading) return <span></span>
    if (isError || isCateError || isRecError) {
        console.log(error || cateError || recError)
        navigate(`/Error`)
    }
    
    const info = product && product.product
    
    
    return product && cateProducts &&
        <ProductsContainer className="" tags={cateProducts.categorySequence} title={info.name}>
            <div className="w-full bg-white flex flex-col justify-center items-center gap-5 ">
                <div className={`flex justify-center items-center lg-max:m-3 lg:min-w-[24rem] lg:min-h-[24rem] `}>
                    {info.images.length !==0 &&
                        <img src={info.images[1].url} alt={info.name}
                             className={`lg:w-96 lg:h-96 object-contain `}/>
                    }
                </div>
                <div className="text-2xl">{info.price} €</div>
                <AddCart product={info} url={info.images && info.images.length !==0 ? info.images[0].url : ''} disabled={false} />
                <div className={`my-12`}>
                    {info.detail}
                </div>
                
            </div>
            <div className="flex flex-col my-16 justify-center items-center lg-max:hidden">
                <div className="mb-16 flex justify-center items-center text-4xl"><i>You May Also Like</i></div>
                <div className="flex flex-row  gap-5">
                    {recommend && recommend.products.filter(p => p.id !== parseInt(productID)).slice(0,3).map((p, i)=>{
                        return (
                            <div className="lg:w-72">
                                <ProductCard key={i} p={p}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </ProductsContainer>
}

/**
 * End of Product Component
 */
export default ProductDetail