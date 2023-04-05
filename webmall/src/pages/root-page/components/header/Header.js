/**
 * @Description Header Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React from 'react'
import Marquee from './Marquee'
import { Categories } from '../categories/Categories'
import Corner from './Corner'

const Header = () => {
    return (
        <div className="fixed top-0 w-full z-50">
            <div className="flex flex-col lg:flex-row h-14 lg:h-8 justify-between text-slate-800">
                <div className="relative left-0 w-full lg:w-2/3 overflow-hidden ">
                    <Marquee />
                </div>
                <Corner />
            </div>
            <Categories />
            <hr/>
        </div>
        
    )
}
/**
 * End of Header Component
 */
export default Header