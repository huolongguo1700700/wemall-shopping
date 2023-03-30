/**
 * @Description fetchCategories function
 * @author GYX xiao sb
 * @date 30.03.2023
*/
import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from './client'

export default function useFetchCategories () {
    /* Using the query hook to fetch single Product info from API */
    return  useQuery({queryKey: ['categories'], queryFn: fetchCategories})
}