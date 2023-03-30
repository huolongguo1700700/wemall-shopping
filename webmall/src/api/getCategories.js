/**
 * @Description getCategories function
 * @author GYX xiao sb
 * @date 30.03.2023
*/
import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from './client'

export default function useGetCategories () {
    const {isLoading, error, isError, data} = useQuery({queryKey: ['categories'], queryFn: fetchCategories})
    
    return {isLoading, error, isError, data}
}