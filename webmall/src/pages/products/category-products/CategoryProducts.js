/**
 * @Description CategoryProducts Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchProducts from '../../../api/fetchProducts'
import DisplayProducts from '../products-display/DisplayProducts'

const CategoryProducts = () => {
    const { categoryID  } = useParams()
    
    /* initialize products */
    const [cateProducts, setCateProducts] = useState(null)
    /* Get Products hook(fake) */
    const {data, isLoading, error, isError} = useFetchProducts(parseInt(categoryID))
    
    /* Avoid too many requests */
    useEffect(()=>{
        setCateProducts(data && data)
    }, [data])
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) return {error}
    
    /* Filter all the products with same the category_id */
    const products = cateProducts && cateProducts.products.filter(product => product.category_id === parseInt(categoryID))
    
    
    return (
        <div>
            {
                cateProducts && products.map((p) => <DisplayProducts products={p}/>)
            }
        </div>
    )
}
/**
 * End of CategoryProducts Component
 */
export default CategoryProducts