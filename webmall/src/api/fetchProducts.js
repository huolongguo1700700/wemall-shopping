/**
 * @Description fetchProducts function
 * @author GYX xiao sb
 * @date 30.03.2023
*/

import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from './client'

/* Using the query hooks */
export default function useFetchProducts () {
    /* Calling request API function and keep data by useQuery */
    return useQuery({queryKey:['products'], queryFn: fetchProducts})
}