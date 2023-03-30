/**
 * @Description fetchProducts function
 * @author GYX xiao sb
 * @date 30.03.2023
 */

import { useQuery } from '@tanstack/react-query'
import { fetchSingleCategory } from './client'

/* Using the query hooks */
export default function useFetchCategory (categoryID) {
    /* Calling request API function and keep data by useQuery */
    return useQuery({queryKey:['products', categoryID], queryFn: () => fetchSingleCategory(categoryID)})
}