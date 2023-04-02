/**
 * @Description ProductsContainer Component
 * @author GYX xiao sb
 * @date 2023/4/2
 */

import React from 'react'
import TagsNavigation from '../category_navigation/TagsNavigation'

const ProductsContainer = (props) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="">
                <TagsNavigation tags={props.tags}/>
            </div>
            <hr className="w-1/2"/>
            <div className="">
                {props.children}
            </div>
        </div>
    )
}
/**
 * End of ProductsContainer Component
 */
export default ProductsContainer