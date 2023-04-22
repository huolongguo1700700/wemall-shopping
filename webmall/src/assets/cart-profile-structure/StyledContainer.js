/**
 * @Description StyledContainer Component
 * @author
 * @date 2023/4/20
 */

import React from 'react'

const StyledContainer = (props) => {
    return (
        <div className="flex flex-col h-full w-full m-5 gap-5">
            {props.children}
        </div>
    )
}
/**
 * End of StyledContainer Component
 */
export default StyledContainer