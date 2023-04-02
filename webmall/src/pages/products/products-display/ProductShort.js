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

const ProductShort = ({ p }) => {
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
    
    const info = product && product.product
    
    return product &&
           <CubeContainerStyles className="">
               <Link to={`/collections/product/${p.id}/${p.category_id}`} className="flex flex-col gap-6 items-center text-center" >
                   <div className={`min-w-[14rem] min-h-[14rem] w-56 h-56`}>
                       {info.images.length !==0 &&
                           <img src={info.images[0].url} alt={info.name} className={`w-full h-full object-contain`}/>
                       }
                   </div>
                   <p className={` text-lg lg:text-xl `}>
                       {p.name}
                   </p>
               </Link>
               <div>
                   <div className="h-full text-xl lg:text-2xl">
                       <p >{p.price} €</p>
                   </div>
               </div>
               <div className="gap-3 px-12 ">
                   <AddCart product={p} disabled={false} />
               </div>
           </CubeContainerStyles>
}

const CubeContainerStyles = tw.div`
    flex flex-col justify-center items-center
    min-w-sm max-w-lg w-full h-full
    p-3 py-6 mx-auto
    gap-8
    bg-white
    drop-shadow-md hover:shadow-2xl rounded-xl z-0
`

/**
 * End of ProductShort Component
 */
export default ProductShort