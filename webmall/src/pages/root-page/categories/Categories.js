/**
 * @Description Navigation Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React, { useState, useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import Classify from './classify'
import { CategoryList } from './CategoryList'
import { useQuery } from '@tanstack/react-query'
import AppContext from '../Context'
import LoadingSkeleton from '../../skeletons/LoadingSkeleton'
import useFetchCategories from '../../../api/fetchCategories'
import { fetchCategories } from '../../../api/client'
import { useWindowSize } from '../../../hooks'

export const Categories = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* Mobile device 2-level catalogue switch toggle */
    const [selectedCategory, setSelectedCategory] = useState(null)
    
    /* Fetch Context from Burger Component for open the category lists for responsive design */
    const {isOpen, toggleOpen} = useContext(AppContext)
    
    const window = useWindowSize()
    
    useFetchCategories()
    
    useEffect(() => {
        if (isOpen && window.width <= 1024 ) document.body.classList.add("disable-scroll")
        else document.body.classList.remove("disable-scroll")
    }, [isOpen, window])
    
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
    
    return categories &&
        <ContainerStyles className={`${isOpen && "lg-max:left-0"}`}>
            <MiddleContainerStyles>
                <div className="w-1/5 h-full  lg-max:hidden flex flex-row justify-center items-center">
                    <NavLink to={"/collections"} className="flex flex-row justify-center items-center gap-2">
                        <img className="w-8 h-8" src="/assets/Logo/avocado-512.png" alt="" />
                        <span>Collections</span>
                    </NavLink>
                </div>
                <ItemContainerStyles>
                    {navCategory.map((c, i) => {
                        return (
                            <CategoryList key= {i}
                                          category={c}
                                          isOpen={isOpen}
                                          toggle={selectedCategory === c.id}
                                          closeCategories={toggleOpen}
                                          setSelectedCategory={setSelectedCategory}
                            />
                        )
                    })}
                </ItemContainerStyles>
            </MiddleContainerStyles>
        </ContainerStyles>
}
const ContainerStyles = tw.div`
    lg:h-12
    lg-max:px-0 lg:px-3
    lg:bg-white
    dark:lg:bg-green-600
    dark:text-lime-400
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
    max-w-[1920px]
    lg-max:backdrop-blur-sm
    flex flex-col lg:flex-row w-full h-full
    xl:px-0
    lg:items-center
    justify-center
    
`

const ItemContainerStyles = tw.div`
    flex lg-max:flex-col
    w-full h-full
    lg-max:py-12
    items-center
    justify-start
    lg-max:h-[calc(100vh-60px)]
    lg-max:overflow-y-auto
`
/**
 * End of Navigation Component
 */
