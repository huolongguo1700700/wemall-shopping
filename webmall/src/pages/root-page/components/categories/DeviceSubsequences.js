/**
 * @Description DeviceSubsequences Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { ActiveLinkStyles, HoverStyles } from './CategoryList'

const DeviceSubsequences = ({ sequence }) => {
    return (
        sequence && sequence.length !== 0 &&
        <Fragment>
            {sequence.map((s, i) =>
                <NavLink
                    key={i}
                    className={({isActive}) => isActive ? ` ${ActiveLinkStyles} ${HoverStyles} origin-top overflow-hidden` : `${HoverStyles}`}
                    to={`/collections/${s.name}/${s.id}`}
                >
                    <div className="">{s.name}</div>
                </NavLink>
            )}
        </Fragment>
    )
}

/**
 * End of Category Component
 */
export default DeviceSubsequences