/**
 * @Description TagsNavigation Component
 * @author GYX xiao sb
 * @date 2023/4/1
 */

import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const TagsNavigation = ({ tags }) => {
    return (tags &&
        <div className={`flex flex-row gap-3 w-full h-12 justify-start items-center`}>
            <NavLink className={tags.length ===0 ? `${LinkStyles} ${ActiveStyles}` : `${LinkStyles}`}
                     to="/collections"
            >
                Collections
            </NavLink>
            {tags.length !==0 && tags.map((t, i) => {
                return (
                    <Fragment key={i}>
                        <span className="h-1/2 w-[1px] bg-slate-500 "></span>
                        <NavLink className={({ isActive }) => isActive ? `${LinkStyles} ${ActiveStyles}` : `${LinkStyles}`}
                                 to={`/collections/${t.name}/${t.id}`}
                        >
                            {t.name}
                        </NavLink>
                    </Fragment>
                )
            })}
        </div>
    )
}

const LinkStyles = `
    hover:underline
    hover:underline-offset-2
    hover:text-lime-500
`

const ActiveStyles =`
    text-lime-600
    hover:no-underline
`
/**
 * End of TagsNavigation Component
 */
export default TagsNavigation