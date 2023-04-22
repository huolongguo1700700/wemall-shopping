/**
 * @Description fetchCategories function
 * @author GYX xiao sb
 * @date 30.03.2023
*/
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { fetchCategories } from './client'

export default function useFetchCategories () {
    /* Using the query hook to fetch categories info from API */
    // Initialize the QueryClient instance from the React Query context
    const queryClient = useQueryClient()
    
    /* Use the useEffect hook to run side effects after the component has rendered */
    useEffect(() => {
        /* Prefetch the categories' data using the QueryClient */
        queryClient.prefetchQuery(['categories'], fetchCategories)
    }, [queryClient]) // The dependency array, which includes queryClient
}