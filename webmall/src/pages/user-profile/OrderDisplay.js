/**
 * @Description OrderDisplay Component
 * @author GYX xiao sb
 * @date 2023/4/15
 */

import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { setOrderID } from '../../stores/orders/oderSlice'
import { useDispatch } from 'react-redux'

const OrderDisplay = ({order, isBriefly}) => {
    const dispatch = useDispatch()
    
    return (<div className="flex flex-col">
            {order.products.slice(0, isBriefly ? 3 : order.products.length).map((p, i) => {
                return (
                    <div key={i} className="flex flex-row gap-4 w-full h-full">
                        <NavLink to={`/collections/product-info/${p.id}/${p.categoryId}`}>
                            <img className="w-20 h-20 object-contain " src={p.image.url} alt={p.name}/>
                        </NavLink>
                        <div>{p.name}</div>
                        <div>{p.price}</div>
                        <div>{p.count}</div>
                    </div>)
            })}
            <div>Total price: {order.totalPrice}</div>
            {isBriefly && <Link to={`/profile/order`} onClick={() => dispatch(setOrderID(order.orderId))}>
                More Details
            </Link>}
        </div>)
}
/**
 * End of OderDisplay Component
 */
export default OrderDisplay