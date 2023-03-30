/**
 * @Description Main Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getProducts from '../../../../api/getProducts'

const Main = () => {
    /* initialize products */
    const [products, setProducts] = useState(null)
    /* Get Products hook(fake) */
    const {data, isLoading, error, isError} = getProducts()
    
    /* Avoid too many requests */
    useEffect(()=>{
        setProducts(data && data)
    }, [data])
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) return {error}
    
    return (
        <>
            {products && products.products.map(p => {
                return (
                    <div key={p.id}
                         className="flex gap-2 w-full h-full bg-sky-100">
                        <Link to={`product/${p.id}`}
                              className="flex gap-2 w-fit bg-sky-100">
                            <p>{p.name}</p>
                            <p>{p.price} $</p>
                            <p>{p.categories}</p>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}
/**
 * End of Main Component
 */
export default Main