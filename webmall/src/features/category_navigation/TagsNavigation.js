/**
 * @Description TagsNavigation Component
 * @author GYX xiao sb
 * @date 2023/4/1
 */

import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const TagsNavigation = ({ tags }) => {
    console.log(tags)
    return (tags &&
        <div className={`flex flex-row gap-3`}>
            <NavLink to="/collections">Collections</NavLink>
            { tags.length !==0 && tags.map((t, i) => {
                return (
                    <Fragment key={i}>
                        <span>|</span>
                        <NavLink to={`/collections/${t.name}/${t.id}`}>{t.name}</NavLink>
                    </Fragment>
                )})
            }
        </div>
    )
}
/**
 * End of TagsNavigation Component
 */
export default TagsNavigation