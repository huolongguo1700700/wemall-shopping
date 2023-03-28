/**
 * @Description Home Component
 * @author GYX xiao sb!
 * @date 27.03.2023
 */

import React from 'react'
import tw from 'tailwind-styled-components'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts, fetchCategories, fetchSingleCategory } from '../../api/client'
import { Link } from 'react-router-dom'

const Home = () => {
    /* Using the query hooks */
    const products = useQuery({queryKey:['products'], queryFn: fetchProducts})
    const categories = useQuery({queryKey:['categories'], queryFn: fetchCategories})
    const category = useQuery({queryKey:['category'], queryFn: () => fetchSingleCategory(4)})
    
    /* Error and Loading states */
    // States for the entire products and categories
    if (products.isError || categories.isError) return <div>Error! {products.error || categories.error}</div>
    if (products.isLoading || categories.isLoading) return <div>Loading...</div>
    
    /* States for single category */
    if (category.isLoading) return <span>Single Loading...</span>
    if (category.isError) return <span>Error: {category.error}</span>
    
    /* Print out all info in string */
    const productsInfo = products.data.products
    const categoriesInfo = categories.data.categories
    
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="h-10 text-3xl font-bold">eCommerce Web Project</h2>
            <hr/>
            {
                categoriesInfo.map((c, i) => {
                    return (
                        <div key={i}
                             className="flex gap-2"
                        >
                            <p>{c.name}</p>
                            <p>{c.id}</p>
                        </div>
                    )
                })
            }
            <hr/>
            {
                productsInfo.map((p, i) => {
                    return (
                        <div className="flex gap-2 w-full bg-sky-100">
                            <Link key={i} to={`product/${p.id}`}
                                  className="flex gap-2 w-fit bg-sky-100">
                                <p>{p.name}</p>
                                <p>{p.price} $</p>
                                <p>{p.id}</p>
                            </Link>
                        </div>
                    
                    )
                })
            }
        </div>
    )
}
/**
 * End of Home Component
 */
export default Home