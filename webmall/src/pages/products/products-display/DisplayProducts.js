/**
 * @Description DisplayProducts Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React from 'react'
import { Link } from 'react-router-dom'

const DisplayProducts = ({products}) => {
    
    return (
        <div key={products.id}
             className="flex gap-2 w-full h-full bg-sky-100">
            <Link to={`/product/${products.id}`}
                  className="flex gap-2 w-fit bg-sky-100">
                <p>{products.name}</p>
                <p>{products.price} €</p>
                <p>{products.categories}</p>
            </Link>
        </div>
    )
}
/**
 * End of DisplayProducts Component
 */
export default DisplayProducts