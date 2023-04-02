/**
 * @Description ProductsContainer Component
 * @author GYX xiao sb
 * @date 2023/4/2
 */

import React from 'react'
import TagsNavigation from '../category_navigation/TagsNavigation'

const ProductsContainer = (props) => {
    return (
        <div className="flex flex-col w-full h-full justify-center items-center lg:px-12 py-2">
            <div className="w-full flex items-center justify-center  h-16 lg:h-28 text-xl lg:text-5xl font-bold">{props.title}</div>
    
            <div className="w-full lg-max:px-16">
                <TagsNavigation tags={props.tags}/>
            </div>
            
            <hr className="w-full"/>
            <div className="w-full py-8 lg-max:px-16">
                {props.children}
            </div>
        </div>
    )
}
/**
 * End of ProductsContainer Component
 */
export default ProductsContainer