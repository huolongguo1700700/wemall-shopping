/**
 * @Description fetchCategoryProducts function
 * @author GYX xiao sb
 * @date 30.03.2023
 */

import { useQuery } from '@tanstack/react-query'
import { fetchProductsByCategory } from './client'

/* Using the query hooks */
export default function useFetchCategoryProducts (categoryID) {
    /* Calling request API function and keep data by useQuery */
    return useQuery({queryKey:['products', categoryID], queryFn: () => fetchProductsByCategory(categoryID)})
}