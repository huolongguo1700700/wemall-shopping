/**
 * @Description ProductShort Component
 * @author GYX xiao sb
 * @date 2023/4/2
 */

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFetchProduct from '../../../api/fetchProduct'
import tw from 'tailwind-styled-components'
import AddCart from '../../../features/add-to-cart/AddCart'
import { useQuery } from '@tanstack/react-query'
import { fetchSingleProduct } from '../../../api/client'
import ProductSkeleton from '../../skeletons/ProductListsSkeleton'

const ProductCard = ({ p }) => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    useFetchProduct(p.id)
    
    /* Calling request API function and keep data by useQuery */
    const { data:product, isLoading, error, isError } = useQuery({
        queryKey:['product', p.id],
        queryFn:() => fetchSingleProduct(p.id),
        staleTime: Infinity
    })
    
    /* Error and Loading states */
    if (isLoading) return <ProductSkeleton />
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    /* Fetch info and image URL */
    const info = product && product.product
    const imageUrl = info.images && info.images.length !==0 ? info.images[0].url : ''
    
    return product &&
           <CubeContainerStyles className="">
               <Link to={`/collections/product-info/${p.id}/${p.category_id}`} className="flex flex-col gap-6 items-center text-center" >
                   <div className="flex justify-center items-center min-w-[8rem] min-h-[8rem] w-32 h-32 sm:w-36 sm:h-36 md:w-56 md:h-56">
                   {imageUrl &&
                       <img src={imageUrl} alt={info.name} className={`w-full h-full object-contain`}/>
                   }
                   </div>
                   <p className={` sm:text-lg lg:text-xl`}>
                       {p.name}
                   </p>
               </Link>
               <div>
                   <div className="h-full md:text-xl lg:text-2xl">
                       <p >{p.price} €</p>
                   </div>
               </div>
               <div className="gap-3 px-12 w-full">
                   <AddCart product={info} url={imageUrl} disabled={true} background={`bg-white`}/>
               </div>
           </CubeContainerStyles>
}

const CubeContainerStyles = tw.div`
    flex flex-col justify-center items-center
    min-w-sm max-w-lg w-full h-full
    p-2 md:p-3 py-6 mx-auto
    gap-8 lg:gap-12
    bg-white
    transition-all duration-300 ease-linear
    drop-shadow-xl hover:shadow-2xl rounded-xl z-0
`

/**
 * End of ProductShort Component
 */
export default ProductCard