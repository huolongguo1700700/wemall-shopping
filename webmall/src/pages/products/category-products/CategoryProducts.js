/**
 * @Description CategoryProducts Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useFetchCategoryProducts from '../../../api/fecthCategoryProducts'
import DisplayProducts from '../products-display/DisplayProducts'
import TagsNavigation from '../../../features/category_navigation/TagsNavigation'

const CategoryProducts = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const { categoryID  } = useParams()
    const navigate = useNavigate()
    
    /* Get Products hook(fake) */
    const {data: cateProducts, isLoading, error, isError} = useFetchCategoryProducts(categoryID)
    
    console.log(cateProducts && cateProducts)
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return cateProducts &&
        <div className="flex flex-col">
            <TagsNavigation tags={cateProducts.categorySequence}/>
            <DisplayProducts products={cateProducts}/>
        </div>
    
}
/**
 * End of CategoryProducts Component
 */
export default CategoryProducts