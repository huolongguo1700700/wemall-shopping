/**
 * @Description CartTitle Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React from 'react'
import { useDispatch } from 'react-redux'
import { BiTrash } from 'react-icons/bi'
import { removeAllItems } from '../../stores/cart/cartSlice'

const CartTitle = () => {
    const dispatch = useDispatch()
    return (
        <div className="h-24 lg:h-32 w-full border-b-2 border-gray-200 dark:border-gray-300">
            <div className="flex flex-row justify-between items-center h-full w-full">
                <div className="text-2xl lg:text-3xl">
                    Shopping Cart
                </div>
                <div className="flex justify-between items-center gap-1">
                    <div className="text-xl lg:text-2xl">
                        <div className="hover:text-lime-500 dark:hover:text-lime-300 cursor-pointer" onClick={() => dispatch(removeAllItems())}>
                            <BiTrash />
                        </div>
                    </div>
                    <div className="text-lg lg:text-xl" >Empty</div>
                </div>
            </div>
        </div>
    )
}
/**
 * End of CartTitle Component
 */
export default CartTitle