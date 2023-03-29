/**
 * @Description Main Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../../../../api/client'

const Main = () => {
    /* Using the query hooks */
    const products = useQuery({queryKey:['products'], queryFn: fetchProducts})
    
    /* Error and Loading states */
    // States for the entire products and categories
    if (products.isError) return <div>Error! {products.error}</div>
    if (products.isLoading) return <div>Loading...</div>
    
    /* Print out all info in string */
    const productsInfo = products.data.products
    
    return (
        <>
            <hr/>
            {productsInfo.map(p => {
                return (
                    <div key={p.id}
                         className="flex gap-2 w-full bg-sky-100">
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