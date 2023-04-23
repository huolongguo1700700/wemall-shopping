/**
 * @Description CartItem Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React from 'react'
import AddCart from '../../features/add-to-cart/AddCart'
import { BiTrash } from 'react-icons/bi'
import { removeItem } from '../../stores/cart/cartSlice'
import { useDispatch } from 'react-redux'

const CartItem = ({ p }) => {
    const dispatch = useDispatch()
    return (
        <div className="grid grid-cols-4 w-full h-full items-center justify-items-start border-b border-gray-100 dark:hover:bg-green-600 hover:bg-green-50 p-2">
            <div className="w-full h-full flex gap-3 lg:gap-5 col-span-2 p-2">
                <div className="w-20 h-20 bg-white">
                    {p.image &&
                        <img src={p.image} alt={p.name} className={`w-20 h-20 min-h-[5rem] min-w-[5rem] object-contain`}/>
                    }
                </div>
                <div>
                    <div className="truncate lg-max:text-sm">{p.name}</div>
                    <div className="">€{p.price}</div>
                </div>
        
            </div>
        
            <div className="col-span-1 w-full h-full flex items-center scale-75">
                <AddCart product={p} quantity={p.quantity} disabled={false}/>
            </div>
            <div className="col-span-1 w-full h-full flex flex-row items-center justify-end gap-2">
                <div className="flex justify-between">
                    <div className="w-full">€</div>
                    <div className="w-12">{(p.price * p.quantity).toFixed(2)}</div>
                </div>
            
                <div className=" h-full flex justify-center items-center  gap-1">
                    <div className="text-xl cursor-pointer hover:text-lime-400" onClick={() => dispatch(removeItem(p.id))}>
                        <BiTrash />
                    </div>
                    <div className="lg-max:hidden" >Remove</div>
                </div>
            </div>
        </div>
    )
}
/**
 * End of CartItem Component
 */
export default CartItem