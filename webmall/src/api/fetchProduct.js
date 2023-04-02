/**
 * @Description fetchProduct function
 * @author GYX xiao sb
 * @date 30.03.2023
*/
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { fetchSingleProduct } from './client'

export default function useFetchProduct (productID) {
    /* Using the query hook to fetch single Product info from API */
    // Initialize the QueryClient instance from the React Query context
    const queryClient = useQueryClient()
    
    useEffect(() => {
        queryClient.prefetchQuery(['product', productID], () => fetchSingleProduct(productID))
    }, [productID, queryClient]) // The dependency array, which includes productID and queryClient
}