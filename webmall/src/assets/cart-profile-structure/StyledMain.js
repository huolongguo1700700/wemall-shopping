/**
 * @Description StyledMain Component
 * @author
 * @date 2023/4/20
 */

import React from 'react'
import Header from '../../pages/root-page/header/Header'

const StyledMain = (props) => {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <Header />
            <div className="flex flex-row w-full max-w-[1920px] h-full mt-14 lg:mt-20">
                {props.children}
            </div>
        </div>
    )
}
/**
 * End of StyledMain Component
 */
export default StyledMain