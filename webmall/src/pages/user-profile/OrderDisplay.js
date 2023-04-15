/**
 * @Description OrderDisplay Component
 * @author GYX xiao sb
 * @date 2023/4/15
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { selectOrders } from '../../stores/orders/orderSelectors'

const OrderDisplay = () => {
    
    const orders = useSelector(selectOrders)
    return (
        <div>
            {JSON.stringify(orders)}
        </div>
    )
}
/**
 * End of OderDisplay Component
 */
export default OrderDisplay