/**
 * @Description getProduct function
 * @author GYX xiao sb
 * @date 30.03.2023
*/
import { useQuery } from '@tanstack/react-query'
import { fetchSingleProduct } from './client'

export default function useGetProduct (productID) {
    /* Using the query hook to fetch single Product info from API */
    const {isLoading, error, isError, data} = useQuery({queryKey:['product', productID], queryFn: () => fetchSingleProduct(productID)})
    
    return {isLoading, error, isError, data}
}