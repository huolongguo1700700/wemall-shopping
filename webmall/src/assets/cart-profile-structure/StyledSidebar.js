/**
 * @Description StyledSidebar Component
 * @author GYX xiao sb
 * @date 2023/4/20
 */

import React from 'react'

const StyledSidebar = (props) => {
    return (
        <div className={`${props.deviceHidden ? "lg-max:hidden" :"lg:hidden"} flex lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] lg:w-[400px] bg-white lg:px-5 lg:pt-8`}>
            <div className="flex flex-col w-full lg:h-[28rem] justify-center lg:justify-between items-center">
                {props.children}
            </div>
        </div>
    )
}
/**
 * End of StyledSidebar Component
 */
export default StyledSidebar