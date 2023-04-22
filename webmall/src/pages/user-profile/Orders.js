/**
 * @Description Orders Component
 * @author GYX xiao sb
 * @date 2023/4/22
 */

import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { selectOrders } from '../../stores/orders/orderSelectors'
import { NavLink } from 'react-router-dom'
import OrderDisplay from './OrderDisplay'

const Orders = () => {
    
    const orders = useSelector(selectOrders)
    console.log(orders.orders && orders.orders)
    return (
        <div className="w-full h-full flex flex-col gap-12 justify-center items-start">
            {orders.orders && orders.orders.map((o,i) => {
                return (
                    <div className="flex flex-col">
                        <NavLink to={`/profile/order/${o.orderId}`} key={i} >
                            {o.orderId}
                        </NavLink>
                        <OrderDisplay key={i} products={o.products}/>
                    </div>
                )
            })}
        </div>
    )
}
/**
 * End of Orders Component
 */
export default Orders