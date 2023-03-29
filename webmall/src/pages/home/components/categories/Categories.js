/**
 * @Description Navigation Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../../../../api/client'
import Classify from './classify'
import Subsequences from './Subsequences'

const Categories = () => {
    /* Using the query hooks */
    // const category = useQuery({queryKey: ['category'], queryFn: () => fetchSingleCategory(4)})
    const categories = useQuery({queryKey: ['categories'], queryFn: fetchCategories})
    
    /* Error and Loading states */
    if (categories.isLoading) return <span>Single Loading...</span>
    if (categories.isError) return <span>Error: {categories.error}</span>
    
    /* Print out all info in string */
    const categoriesInfo = categories.data.categories
    
    /* Categories drop-down navigation function */
    const navCategory = Classify(categoriesInfo)
    
    return (
        <div className="flex items-center justify-center">
            <div className=" flex w-2/3 h-12">
                {navCategory.map((c, i) => {
                    return (
                        <div key={i} className="relative w-full h-full group/category">
                            <div className="flex w-full h-full font-bold group-hover/category:bg-lime-300 cursor-pointer justify-center items-center">
                                <div>{c.name}</div>
                            </div>
                            <Subsequences sequence={c.subsequence} />
                        </div>
                    )
                })}
            </div>
        </div>
    
    )
}
/**
 * End of Navigation Component
 */
export default Categories