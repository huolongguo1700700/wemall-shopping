/**
 * @Description Cart Component
 * @author GYX xiao sb
 * @date 2023/3/29
 */

import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Burger from './Burger/Burger'

const Navigation = () => {
    return (
        <>
            <div className="w-full lg:w-1/3 lg:relative right-0 gap-2 h-8 overflow-hidden flex flex-row items-center bg-lime-300 z-[999]">
                <div className="absolute left-6 lg:hidden">
                    <Burger color={"bg-black"}/>
                </div>
                
                <div className="flex flex-row absolute right-6 gap-3 h-8 px-1 lg:px-2 items-center cursor-pointer lg:rounded-sm group hover:text-white">
                    <div className="text-black group-hover:text-white scale-150 ">
                        <AiOutlineShoppingCart />
                    </div>
                    <div className="text-sm w-6 text-right lg-max:hidden">2</div>
                    <div className="text-sm text-right lg-max:hidden">|</div>
                    <div className="text-sm text-right lg-max:hidden">1234 €</div>
                </div>
            </div>
        </>
    )
}
/**
 * End of Cart Component
 */
export default Navigation