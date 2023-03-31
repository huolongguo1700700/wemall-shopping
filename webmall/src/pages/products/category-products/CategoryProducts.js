// noinspection ES6CheckImport

/**
 * @Description CategoryProducts Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchCategoryProducts from '../../../api/fecthCategoryProducts'
import DisplayProducts from '../products-display/DisplayProducts'

const CategoryProducts = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const { categoryID  } = useParams()
    const navigate = useNavigate()
    
    /* initialize products */
    const [cateProducts, setCateProducts] = useState(null)
    
    /* Get Products hook(fake) */
    const {data, isLoading, error, isError} = useFetchCategoryProducts(categoryID)
    
    /* Avoid too many requests */
    useEffect(()=>{
        setCateProducts(data && data)
    }, [data])
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    /* Filter all the products with same the category_id in front-end */
    // const products = cateProducts && cateProducts.products.filter(product => product.category_id === parseInt(categoryID))
    
    
    return (
        <>
            {cateProducts && cateProducts.products.map((p, i) => <DisplayProducts key={i} products={p}/>)}
        </>
    )
}
/**
 * End of CategoryProducts Component
 */
export default CategoryProducts