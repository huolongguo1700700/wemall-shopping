/**
 * @Description fetchCategoryProducts function
 * @author GYX xiao sb
 * @date 30.03.2023
 */

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { fetchProductsByCategory } from './client'

/* Using the query hooks */
export default function useFetchCategoryProducts (categoryID) {
    const queryClient = useQueryClient()
    
    /* Use the useEffect hook to run side effects after the component has rendered */
    useEffect(() => {
        /* Prefetch the products data by category using the QueryClient, with the provided categoryID as the query key */
        queryClient.prefetchQuery(['cate-products', categoryID], () => fetchProductsByCategory(categoryID))
    }, [categoryID, queryClient])
}