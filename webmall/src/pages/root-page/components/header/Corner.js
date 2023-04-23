/**
 * @Description Cart Component
 * @author GYX xiao sb
 * @date 2023/3/29
 */

import React, { Fragment } from 'react'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import Burger from './Burger/Burger'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectProductCount, selectTotalPrice } from '../../../../stores/cart/cartSelectors'
import { selectUserIsLogin } from '../../../../stores/user/userSelectors'

const Corner = () => {
    const isLogin = useSelector(selectUserIsLogin)
    
    const totalPrice = useSelector(selectTotalPrice).toFixed(2)
    
    const totalProductNumber = useSelector(selectProductCount)
    
    return (
        <Fragment>
            <div className="w-full lg:w-1/3 lg:relative right-0 h-8 overflow-hidden flex flex-row items-center bg-lime-300 dark:bg-green-800 dark:text-lime-50 z-[999]">
                <div className="absolute left-6 lg:hidden">
                    <Burger color={"bg-black"}/>
                </div>
                <div className="flex flex-row absolute right-6 gap-2 h-8 items-center lg:rounded-sm">
                    <NavLink className="text-black dark:text-lime-50 hover:text-white dark:hover:text-lime-400 text-xl scale-125" to={`/cart`}>
                        <AiOutlineShoppingCart />
                    </NavLink>
                    <div className="text-sm w-6 text-right lg-max:hidden">{totalProductNumber}</div>
                    <span className="lg-max:hidden h-2/3 w-0.5 bg-slate-500/70 dark:bg-slate-300/80"></span>
                    <div className="text-sm text-right lg-max:hidden w-16">{totalPrice} €</div>
                    <NavLink className="ml-2 text-2xl hover:text-white dark:hover:text-lime-400" to={isLogin ? '/profile' : `/login`}>
                        <AiOutlineUser />
                    </NavLink>
                </div>
                
            </div>
        </Fragment>
    )
}
/**
 * End of Cart Component
 */
export default Corner