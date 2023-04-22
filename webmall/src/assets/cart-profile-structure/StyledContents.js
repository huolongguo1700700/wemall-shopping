/**
 * @Description StyledContents Component
 * @author
 * @date 2023/4/20
 */

import React from 'react'

const StyledContents = (props) => {
    return (
        <div className="flex w-full h-full bg-white p-3 justify-center items-center">
            <div className="flex-col w-full h-full min-h-[80vh] max-w-7xl">
                {props.children}
            </div>
        </div>
    )
}
/**
 * End of StyledContents Component
 */
export default StyledContents