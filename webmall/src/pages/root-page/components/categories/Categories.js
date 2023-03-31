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
        <ContainerStyles className={`${isOpen && "lg-max:left-0"}`}>
            <MiddleContainerStyles>
                <div className="lg-max:hidden w-1/5 h-full" onClick={toggleOpen}></div>
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
    flex items-center justify-center
    lg-max:fixed
    lg-max:top-0 lg-max:-left-full
    lg-max:w-full lg-max:h-full
    lg-max:transition-all lg-max:duration-300 lg-max:ease-in-out
    lg-max:z-30
    select-none
`

const MiddleContainerStyles = tw.div`
    lg-max:mt-28
    lg-max:bg-stone-700/80
    backdrop-blur-sm
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
    justify-center
    lg-max:justify-start
`
/**
 * End of Navigation Component
 */
