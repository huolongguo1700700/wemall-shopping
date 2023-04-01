/**
 * @Description DisplayProducts Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React from 'react'
import { Link } from 'react-router-dom'

const DisplayProducts = ({products}) => {
    
    return (products &&
        <div>
            {products.products.map((p, i) => {
                return (
                    <div key={i}
                        className="flex gap-2 w-full h-full bg-sky-100">
                        <Link to={`/collections/product/${p.id}/${p.category_id}`}
                              className="flex gap-2 w-fit bg-sky-100">
                            <p>{p.name}</p>
                            <p>{p.price} €</p>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

/**
 * End of DisplayProducts Component
 */
export default DisplayProducts