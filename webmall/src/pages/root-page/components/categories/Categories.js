/**
 * @Description Navigation Component
 * @author GYX xiao sb
 * @date 2023/3/28
 */

import React, { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import useFetchCategories from '../../../../api/fetchCategories'
import Classify from './classify'
import Subsequences from './Subsequences'
import OpenContext from '../../Context'

export const Categories = () => {
    /* initialize categories */
    const [categories, setCategories] = useState(null)
    
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
    if (isError) return <span>Error: {error}</span>
    
    
    return (
        <>
            {categories &&
                <>
                    <div className={` ${!isOpen && "md-max:hidden"} flex items-center justify-center md-max:fixed md-max:top-0 md-max:right-0 md-max:w-full md-max:h-full md-max:transition-all md-max:duration-300 md-max:ease-in-out md-max:z-30`}>
                        <div className="md-max:mt-20 md-max:bg-stone-900/80 backdrop-blur-sm flex flex-col w-full h-full md:h-12 md:px-8 xl:px-0 md:items-center justify-center">
                            <div className="flex md-max:flex-col w-full md:px-6 2xl:px-12 2xl:w-2/3 h-full items-center justify-center">
                                {navCategory.map((c, i) => {
                                    return (
                                        <div key={i}
                                             className="md:relative md-max:w-2/3 w-full md:h-full group/category ">
                                            <NavLink className={`md-max:p-4 w-full h-full flex md-max:text-lime-50 md-max:group-hover/category:text-lime-300 group-hover/category:text-white md:group-hover/category:bg-lime-500 cursor-pointer md:justify-center md:items-center ${(isActive) => isActive && "text-lime-500"} `}
                                                     to={`/collections/${c.name}/${c.id}`}
                                            >
                                                <div className="">{c.name} </div>
                                                {/*{c.id}*/}
                                            </NavLink>
                                            <Subsequences sequence={c.subsequence}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="md:hidden h-full" onClick={toggleOpen}></div>
                        </div>
                    </div>
                </>
            }
        </>
    
    )
}
/**
 * End of Navigation Component
 */
