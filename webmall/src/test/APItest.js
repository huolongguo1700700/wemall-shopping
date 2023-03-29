/**
 * @Description ApItest Component
 * @author GYX xiao sb
 * @date 2023/3/29
 */

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchSingleCategory } from '../api/client'

const APItest = () => {
    /* Using the query hooks */
    const category = useQuery({queryKey:['category'], queryFn: () => fetchSingleCategory(4)})
    const categories = useQuery({queryKey:['categories'], queryFn: fetchCategories})
    
    /* Error and Loading states */
    if (categories.isLoading) return <span>Single Loading...</span>
    if (categories.isError) return <span>Error: {categories.error}</span>
    
    /* Print out all info in string */
    const categoriesInfo = categories.data.categories
    return (
        <div>
            {JSON.stringify(categoriesInfo)}
        </div>
    )
}
/**
 * End of ApItest Component
 */
export default APItest