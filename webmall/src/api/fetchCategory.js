/**
 * @Description fetchProducts function
 * @author GYX xiao sb
 * @date 30.03.2023
 */

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchSingleCategory } from './client'

/* Using the query hooks */
export default function useFetchCategory (categoryID) {
    /* Initialize the QueryClient instance from the React Query context */
    const queryClient = useQueryClient()
    
    /* Use the useEffect hook to run side effects after the component has rendered */
    useEffect(() => {
        /* Prefetch the category data using the QueryClient, with the provided categoryID as the query key */
        queryClient.prefetchQuery(['category', categoryID], () => fetchSingleCategory(categoryID))
    }, [categoryID, queryClient]) // The dependency array, which includes categoryID and queryClient
    
    /* Calling request API function and keep data by useQuery */
    return useQuery({queryKey:['category', categoryID], queryFn: () => fetchSingleCategory(categoryID), staleTime: Infinity})
}