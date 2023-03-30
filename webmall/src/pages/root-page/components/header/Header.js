/**
 * @Description Header Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React from 'react'
import Marquee from './Marquee'
import Navigation from './Navigation'

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row h-14 md:h-8 justify-between text-slate-800">
            <div className="relative left-0 w-full md:w-2/3 overflow-hidden ">
                <Marquee />
            </div>
            <Navigation />
        </div>
    )
}
/**
 * End of Header Component
 */
export default Header