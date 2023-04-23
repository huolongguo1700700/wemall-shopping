/**
 * @Description ProductsContainer Component
 * @author GYX xiao sb
 * @date 2023/4/2
 */

import React from 'react'
import DisplayTags from './DisplayTags'
import { useScrollTop } from '../../../hooks'

const ProductsContainer = (props) => {
    useScrollTop()
    
    return (
        <div className="flex flex-col w-full h-full justify-center items-center lg:px-12 py-12 ">
            <div className="w-full flex items-center justify-center lg:h-16 xl:h-28 text-3xl lg:text-5xl font-bold text-center dark:text-lime-50">{props.title}</div>
    
            <div className="w-full">
                <DisplayTags tags={props.tags}/>
            </div>
            
            <hr className="w-full min-w-[300px]"/>
            <div className="w-full flex flex-col py-8 px-6 md:px-8 lg:px-0 max-w-[1920px]">
                {props.children}
            </div>
            {/* To top button */}
            {/*<svg className="rotate-180 w-6 h-6 border border-lime-800 rounded-full cursor-pointer" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
             <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
             </svg>*/}
        </div>
    )
}
/**
 * End of ProductsContainer Component
 */
export default ProductsContainer