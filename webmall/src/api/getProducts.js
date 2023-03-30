/**
 * @Description getProducts function
 * @author GYX xiao sb
 * @date 30.03.2023
*/

import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './client'

/* Using the query hooks */
export default function useGetProducts () {
    /* Calling request API function and keep data by useQuery */
    const {isLoading, error, isError, data} = useQuery({queryKey:['products'], queryFn: fetchProducts})
    
    return {isLoading, error, isError, data}
}