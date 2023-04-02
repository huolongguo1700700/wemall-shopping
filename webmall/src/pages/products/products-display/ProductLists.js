/**
 * @Description DisplayProducts Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React from 'react'
import ProductShort from './ProductShort'

const ProductLists = ({products}) => {
    return (products &&
        <div>
            {products.products.map((p, i) => {
                return (
                    <ProductShort key={i} p={p}/>
                )
            })}
        </div>
    )
}

/**
 * End of DisplayProducts Component
 */
export default ProductLists