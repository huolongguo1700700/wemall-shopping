/**
 * @Description DisplayTags Component
 * @author GYX xiao sb
 * @date 2023/4/1
 */

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSortMethod } from '../../../stores/sort/sortSlice'
import tw from 'tailwind-styled-components'
import { selectLabel, selectOptions } from '../../../stores/sort/sortSelectors'

const DisplayTags = ({ tags }) => {
    /* Dropdown variables */
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef()
    
    /* Click outside to close the dropdown menu */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setDropdownOpen(false)
        }
        
        document.addEventListener("mousedown", handleClickOutside)
        return () => { document.removeEventListener("mousedown", handleClickOutside) }
    }, [])
    
    /* Get current Router path(URL) */
    const location = useLocation()
    
    /* Not to display sorting menu in product-info page */
    const containProduct = location.pathname.includes('/product-info')
    
    /* Set option select menu for sorting products */
    const dispatch = useDispatch()
    const label = useSelector(selectLabel)
    const sortOptions = useSelector(selectOptions)
    
    /* Define a sorting method */
    const handleSortChange = (e) => dispatch(setSortMethod(e.target.value))
    
    return (tags &&
        <div className={`flex flex-col lg:flex-row w-full my-6 h-full justify-between items-center gap-3`}>
            <div className="flex flex-row w-full h-full justify-center lg:justify-start items-center lg-max:gap-2">
                <NavLink className={tags.length ===0 ? `${LinkStyles} ${ActiveStyles}` : `${LinkStyles}`}
                         to="/collections"
                >
                    Collections
                </NavLink>
                {tags.length !==0 && tags.map((t, i) => {
                    return (
                        <Fragment key={i}>
                            <span className="h-6 w-0.5 bg-slate-500/60 dark:bg-slate-300/60 "></span>
                            <NavLink className={({ isActive }) => isActive ? `${LinkStyles} ${ActiveStyles}` : `${LinkStyles}`}
                                     to={`/collections/${t.name}/${t.id}`}
                            >
                                {t.name}
                            </NavLink>
                        </Fragment>
                    )
                })}
            </div>
            {!containProduct &&
                <div  className="w-full h-full flex justify-center lg:justify-end items-center relative px-12">
                    <div ref={dropdownRef} className="w-1/2 md:w-48 ">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="w-full bg-transparent p-1 border border-lime-800 dark:border-lime-500 dark:text-lime-50 rounded-md hover:ring-1 box-border"
                        >
                            {label}
                        </button>
                        {dropdownOpen && (
                            <div className="w-full lg:w-48 z-10 absolute top-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-green-600">
                                <ul className="w-full py-2 text-sm text-gray-700 dark:text-green-200">
                                    {sortOptions.map((opt, i) =>
                                        <ListStyles key={i} onClick={() => {handleSortChange({ target: { value: opt.value } }); setDropdownOpen(false);}}>
                                            {opt.label}
                                        </ListStyles>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

const ListStyles = tw.li`
    w-full
    block
    px-4 py-2
    hover:bg-gray-100
    dark:hover:bg-green-500 dark:hover:text-white
    cursor-pointer
`

const LinkStyles = `
    lg:p-2
    lg:text-lg
    hover:underline
    hover:underline-offset-2
    hover:text-lime-500
    dark:text-lime-400
    dark:hover:text-lime-100
`

const ActiveStyles =`
    text-lime-600
    dark:text-lime-100
    hover:no-underline
`
/**
 * End of DisplayTags Component
 */
export default DisplayTags