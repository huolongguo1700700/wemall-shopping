/**
 * @Description StyledSidebar Component
 * @author GYX xiao sb
 * @date 2023/4/20
 */

import React from 'react'

const StyledSidebar = (props) => {
    return (
        <div className="sticky top-20 h-[calc(100vh-5rem)] w-[400px] bg-white lg-max:hidden px-5 pt-8">
            <div className="flex flex-col w-full h-[28rem] justify-between items-center">
                {props.children}
            </div>
        </div>
    )
}
/**
 * End of StyledSidebar Component
 */
export default StyledSidebar