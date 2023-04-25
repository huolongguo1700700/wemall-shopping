/**
 * @Description Orders Component
 * @author GYX xiao sb
 * @date 2023/4/22
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { selectOrders } from '../../stores/orders/orderSelectors'
import OrderDisplay from './OrderDisplay'
import { NavLink } from 'react-router-dom'

const Orders = () => {
    const orders = useSelector(selectOrders)
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            {orders.orders && true ?
                orders.orders.map((o, i) =>
                    <OrderDisplay key={i} order={o} isBriefly={true} />
                )
                :
                <div className="text-3xl  h-[calc(80vh-3rem)] flex flex-col justify-center items-center gap-5 text-center">
                    <span className="font-light italic">
                        You have not placed any orders.
                    </span>
                    <NavLink className="cursor-pointer hover:text-green-500" to={`/collections`}>
                        Place your first order!
                    </NavLink>
                </div>
            }
        </div>
    )
}
/**
 * End of Orders Component
 */
export default Orders