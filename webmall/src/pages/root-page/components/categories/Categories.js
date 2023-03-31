// noinspection ES6CheckImport

/**
 * @Description Navigation Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import useFetchCategories from '../../../../api/fetchCategories'
import Classify from './classify'
import OpenContext from '../../Context'
import { CategoryList } from './CategoryList'

export const Categories = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* initialize categories */
    const [categories, setCategories] = useState(null)
    
    /* Mobile device 2-level catalogue switch toggle */
    const [selectedCategory, setSelectedCategory] = useState(null)
    
    /* Fetch Context from Burger Component for open the category lists for responsive design */
    const {isOpen, toggleOpen} = useContext(OpenContext)
    
    /* Using the query hooks */
    // const category = useQuery({queryKey: ['category'], queryFn: () => fetchSingleCategory(4)})
    const {data, isLoading, isError, error} = useFetchCategories()
    
    /* Avoid too many requests */
    useEffect(() => {
        setCategories(data && data)
    }, [data])
    
    /* Categories drop-down navigation function */
    const navCategory = categories && Classify(categories.categories)
    
    /* Error and Loading states */
    if (isLoading) return <span>Categories Loading...</span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return (
        categories &&
        <ContainerStyles className={`${isOpen && "md-max:left-0"}`}>
            <MiddleContainerStyles className={`${!isOpen && ""}`}>
                <ItemContainerStyles>
                    {navCategory.map((c, i) => {
                        return (
                            <CategoryList key={i}
                                          category={c}
                                          toggle={selectedCategory === c.id}
                                          setSelectedCategory={setSelectedCategory}
                            />
                        )
                    })}
                </ItemContainerStyles>
                <div className="md:hidden h-full" onClick={toggleOpen}></div>
            </MiddleContainerStyles>
        </ContainerStyles>
    )
}
const ContainerStyles = tw.div`
    flex items-center justify-center
    md-max:fixed
    md-max:top-0 md-max:-left-full
    md-max:w-full md-max:h-full
    md-max:transition-all md-max:duration-300 md-max:ease-in-out
    md-max:z-30
    select-none
`

const MiddleContainerStyles = tw.div`
    md-max:mt-28
    md-max:bg-stone-700/80
    backdrop-blur-sm
    flex flex-col w-full h-full
    md:h-12 md:px-8 xl:px-0
    md:items-center
    justify-center
`

const ItemContainerStyles = tw.div`
    flex md-max:flex-col
    w-full 2xl:w-2/3 h-full
    md:px-6 2xl:px-12
    items-center
    justify-center
    md-max:justify-start
`
/**
 * End of Navigation Component
 */
