/**
 * @Description OrderDisplay Component
 * @author GYX xiao sb
 * @date 2023/4/15
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { setOrderID } from '../../stores/orders/oderSlice'
import { useDispatch } from 'react-redux'

const OrderDisplay = ({order, isBriefly}) => {
    const dispatch = useDispatch()
    
    function formatDate(dateString) {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        
        return `${day}/${month}/${year}`
    }
    
    const timestamp = new Date(order.createdAt).getTime()
    
    return (
        <div className="max-w-5xl w-full h-full p-5 border border-gray-300 mb-8">
            <div className="flex flex-col w-full h-full lg:flex-row justify-between border-b border-gray-300 pb-3">
                <div className="flex w-full gap-1 font-medium text-lg">
                    <span>Order</span>
                    <span>Number</span>
                    <span>:</span>
                    <span>{`${timestamp}${order.orderId}`}</span>
                </div>
                <div className="flex flex-col w-full lg:flex-row gap-1 lg:gap-3 text-sm lg:text-md lg:justify-end">
                    <div className="flex gap-1">
                        <span>Order</span>
                        <span>Date</span>
                        <span>:</span>
                        <span>{formatDate(order.createdAt)}</span>
                    </div>
                    <span className="h-2/3 w-0.5 bg-slate-500/60 dark:bg-slate-300/60 lg-max:hidden"></span>
                    <div className="flex gap-1">
                        <span>Total</span>
                        <span>Price</span>
                        <span>:</span>
                        <span>{order.totalPrice}</span>
                    </div>
                </div>
            </div>
            
            <div className=" w-full h-full flex flex-col gap-3 lg:gap-5 py-5">
                {order.products.slice(0, isBriefly ? 3 : order.products.length).map((p, i) => {
                    return (
                        <div key={i} className="flex gap-2 lg:gap-8 w-full h-full">
                            <div className={`w-20 h-20 lg:w-32 lg:h-32 bg-white flex items-center justify-center`}>
                                <img className="w-20 h-20 lg:w-32 lg:h-32 object-contain min-w-[5rem] min-h-[5rem] lg:min-w-[8rem] lg:min-h-[8rem]" src={p.image.url} alt={p.name}/>
                            </div>
                            <div className="">
                                <div className="h-16 lg:h-20 flex flex-col text-sm md:text-md lg:text-lg">
                                    <span className="">{p.name}</span>
                                    <span>€{p.price}</span>
                                </div>
                                <div className="flex gap-1 text-xs lg:text-sm text-gray-500 dark:text-gray-300">
                                    <span>Quantity:</span>
                                    <span>{p.count}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
                
            </div>
            {isBriefly &&
                <div className="bg-transparent border-2 border-gray-300 w-20 h-8 lg:w-32 lg:h-12  flex justify-center items-center cursor-pointer hover:bg-green-500 hover:text-lime-50 dark:hover:bg-green-400 dark:hover:text-lime-800">
                    <Link className="text-sm lg:text-lg" to={`/profile/order`} onClick={() => dispatch(setOrderID(order.orderId))}>
                        View Order
                    </Link>
                </div>
            }
        </div>
    )
}
/**
 * End of OderDisplay Component
 */
export default OrderDisplay