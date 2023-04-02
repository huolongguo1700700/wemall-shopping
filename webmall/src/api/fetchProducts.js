/**
 * @Description fetchProducts function
 * @author GYX xiao sb
 * @date 30.03.2023
*/

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchProducts } from './client';

// Define the custom hook useFetchProducts
export default function useFetchProducts() {
    /* Initialize the QueryClient instance from the React Query context */
    const queryClient = useQueryClient();
    
    /* Use the useEffect hook to run side effects after the component has rendered */
    useEffect(() => {
        // Prefetch the products' data using the QueryClient
        queryClient.prefetchQuery(['products'], fetchProducts);
    }, [queryClient]); // The dependency array, which includes queryClient
    
    // Call the useQuery hook with the query key 'products' and the fetchProducts function
    /* This hook will manage the data, loading state, and errors for the given query */
}