/**
 * @Description Navigation Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import useFetchCategories from '../../../../api/fetchCategories'
import Classify from './classify'
import AppContext from '../../Context'
import { CategoryList } from './CategoryList'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../../../../api/client'
import LoadingSkeleton from '../../../skeletons/LoadingSkeleton'

export const Categories = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* Mobile device 2-level catalogue switch toggle */
    const [selectedCategory, setSelectedCategory] = useState(null)
    
    /* Fetch Context from Burger Component for open the category lists for responsive design */
    const {isOpen, toggleOpen} = useContext(AppContext)
    
    useFetchCategories()
    
    /* Using the query hook to fetch Categories info from API */
    const {data: categories, isLoading, isError, error} = useQuery({queryKey: ['categories'], queryFn: fetchCategories, staleTime: Infinity})
    
    /* Categories drop-down navigation function */
    const navCategory = categories && Classify(categories.categories)
    
    /* Error and Loading states */
    if (isLoading) return <LoadingSkeleton />
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return (
        categories &&
        <ContainerStyles className={`${isOpen && "lg-max:left-0"}`}>
            <MiddleContainerStyles>
                <div className="w-1/5 xl:w-2/5 h-full flex flex-row justify-center items-center lg-max:hidden">
                    <NavLink to={"/collections"}>
                            Logo Here
                    </NavLink>
                </div>
                <ItemContainerStyles>
                    {navCategory.map((c, i) => {
                        return (
                            <CategoryList key= {i}
                                          category={c}
                                          toggle={selectedCategory === c.id}
                                          closeCategories={toggleOpen}
                                          setSelectedCategory={setSelectedCategory}
                            />
                        )
                    })}
                </ItemContainerStyles>
                <div className="lg:hidden h-full" onClick={toggleOpen}></div>
            </MiddleContainerStyles>
        </ContainerStyles>
    )
}
const ContainerStyles = tw.div`
    lg-max:px-0 lg:px-3
    lg:bg-white
    flex items-center justify-center
    lg-max:fixed
    lg-max:top-0 lg-max:-left-full
    lg-max:w-full lg-max:h-full
    lg-max:duration-300 lg-max:ease-in-out
    lg-max:z-30
    
`

const MiddleContainerStyles = tw.div`
    lg-max:mt-28
    lg-max:bg-stone-700/80
    
    lg-max:backdrop-blur-sm
    flex flex-col lg:flex-row w-full h-full
    lg:h-12 xl:px-0
    lg:items-center
    justify-center
    
`

const ItemContainerStyles = tw.div`
    flex lg-max:flex-col
    w-full 2xl:w-4/5 h-full
    lg-max:py-12
    items-center
    justify-start
`
/**
 * End of Navigation Component
 */
