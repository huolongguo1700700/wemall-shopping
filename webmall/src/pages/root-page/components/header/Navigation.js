/**
 * @Description Cart Component
 * @author GYX xiao sb
 * @date 2023/3/29
 */

import React, { Fragment } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Burger from './Burger/Burger'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProductCount, selectTotalPrice } from '../../../../stores/cart/cartSelectors'

const Navigation = () => {
    const totalPrice = useSelector(selectTotalPrice).toFixed(2)
    
    const totalProductNumber = useSelector(selectProductCount)
    return (
        <Fragment>
            <div className="w-full lg:w-1/3 lg:relative right-0 gap-2 h-8 overflow-hidden flex flex-row items-center bg-lime-300 z-[999]">
                <div className="absolute left-6 lg:hidden">
                    <Burger color={"bg-black"}/>
                </div>
                
                <NavLink className="flex flex-row absolute right-6 gap-3 h-8 px-1 lg:px-2 items-center cursor-pointer lg:rounded-sm group hover:text-white"
                         to={`/cart`}
                >
                    <div className="text-black group-hover:text-white text-xl scale-125">
                        <AiOutlineShoppingCart />
                    </div>
                    <div className="text-sm w-6 text-right lg-max:hidden">{totalProductNumber}</div>
                    <span className="lg-max:hidden h-2/3 w-0.5 bg-slate-500/70"></span>
                    <div className="text-sm text-right lg-max:hidden w-16">{totalPrice} €</div>
                </NavLink>
            </div>
        </Fragment>
    )
}
/**
 * End of Cart Component
 */
export default Navigation