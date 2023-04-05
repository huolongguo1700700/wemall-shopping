/**
 * @Description DisplayProducts Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React, { Fragment } from 'react'
import tw from 'tailwind-styled-components'
import ProductCard from './ProductCard'

const ProductLists = ({products}) => {
    return (products &&
        <DisplayedProductsContainerStyles className="">
            <Fragment>
                {products.map((p, i) => {
                    return (
                        <ProductCard key={i} p={p}/>
                    )}
                )}
            </Fragment>
        </DisplayedProductsContainerStyles>
    )
}
const DisplayedProductsContainerStyles = tw.div`
    w-full h-full
    py-10
    grid 3xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1
    gap-5 lg:gap-8
    justify-center items-center
`

/**
 * End of DisplayProducts Component
 */
export default ProductLists