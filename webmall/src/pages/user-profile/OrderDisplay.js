/**
 * @Description OrderDisplay Component
 * @author GYX xiao sb
 * @date 2023/4/15
 */

import React from 'react'
import { NavLink } from 'react-router-dom'

const OrderDisplay = ({products}) => {
    
    return products.map((p, i) => {
        return (
            <div key={i} className="flex flex-row gap-4 w-full h-full">
                <NavLink to={`/collections/product-info/${p.productId}/${p.categoryId}`}>
                    <img className="w-20 h-20 object-contain " src={p.productImage.url} alt={p.productName}/>
                </NavLink>
                
                <div>{p.productName}</div>
                <div>{p.productPrice}</div>
            </div>
        )
    })
}
/**
 * End of OderDisplay Component
 */
export default OrderDisplay