/**
 * @Description FetchSingleOrder Component
 * @author
 * @date 2023/4/22
 */

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { fetchSingleOrder } from './client'

export default function useFetchOrder (orderID) {
    /* Using the query hook to fetch single Product info from API */
    // Initialize the QueryClient instance from the React Query context
    const queryClient = useQueryClient()
    
    useEffect(() => {
        queryClient.prefetchQuery(['order', orderID], () => fetchSingleOrder(orderID))
    }, [orderID, queryClient]) // The dependency array, which includes productID and queryClient
}