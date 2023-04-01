/**
 * @Description Main Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import useFetchProducts from '../../../../api/fetchProducts'
import DisplayProducts from '../../../products/products-display/DisplayProducts'
import TagsNavigation from '../../../../features/category_navigation/TagsNavigation'

const Collections = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* Get Products hook(fake) */
    const {data: products, isLoading, error, isError} = useFetchProducts()
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    console.log(products)
    return products &&
        <Fragment>
            <TagsNavigation tags={[]}/>
            <DisplayProducts products={products}/>
        </Fragment>
}
/**
 * End of Main Component
 */
export default Collections