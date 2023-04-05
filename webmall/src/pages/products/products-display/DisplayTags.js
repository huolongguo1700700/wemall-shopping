/**
 * @Description DisplayTags Component
 * @author GYX xiao sb
 * @date 2023/4/1
 */

import React, { Fragment } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectSortMethod } from '../../../stores/sort/sortSelectors'
import { setSortMethod } from '../../../stores/sort/sortSlice'

const DisplayTags = ({ tags }) => {
    /* Get current Router path(URL) */
    const location = useLocation()
    /* Not to display sorting menu in product-info page */
    const containProduct = location.pathname.includes('/product-info')
    
    /* Set option select menu for sorting products */
    const dispatch = useDispatch()
    const sortMethod = useSelector(selectSortMethod)
    
    const handleSortChange = (e) => dispatch(setSortMethod(e.target.value))
    
    return (tags &&
        <div className={`flex flex-row gap-2 w-full mt-6 h-12 justify-between items-center`}>
            <div className="flex flex-row w-full h-full justify-start items-center lg-max:gap-2">
                <NavLink className={tags.length ===0 ? `${LinkStyles} ${ActiveStyles}` : `${LinkStyles}`}
                         to="/collections"
                >
                    Collections
                </NavLink>
                {tags.length !==0 && tags.map((t, i) => {
                    return (
                        <Fragment key={i}>
                            <span className="h-1/2 w-0.5 bg-slate-500/60 "></span>
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
                <div >
                    <select className="bg-transparent p-1 border border-lime-800 rounded-md hover:ring-1 box-border " value={sortMethod} onChange={handleSortChange}>
                        <option value="DEFAULT">Features</option>
                        <option value="NAME_ASC">Name (A-Z)</option>
                        <option value="NAME_DESC">Name (Z-A)</option>
                        <option value="PRICE_ASC">Price (Low to High)</option>
                        <option value="PRICE_DESC">Price (High to Low)</option>
                    </select>
                </div>
            }
        </div>
    )
}

const LinkStyles = `
    lg:p-2
    lg:text-lg
    hover:underline
    hover:underline-offset-2
    hover:text-lime-500
`

const ActiveStyles =`
    text-lime-600
    hover:no-underline
`
/**
 * End of DisplayTags Component
 */
export default DisplayTags