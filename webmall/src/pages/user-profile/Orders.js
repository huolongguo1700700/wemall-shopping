/**
 * @Description Orders Component
 * @author GYX xiao sb
 * @date 2023/4/22
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { selectOrders } from '../../stores/orders/orderSelectors'
import OrderDisplay from './OrderDisplay'

const Orders = () => {
    const orders = useSelector(selectOrders)
    
    return (
        <div className="w-full h-full flex flex-col gap-12 justify-center items-start">
            {orders.orders && orders.orders.map((o,i) => <OrderDisplay key={i} order={o} isBriefly={true} />)}
        </div>
    )
}
/**
 * End of Orders Component
 */
export default Orders