/**
 * @Description Subsequences Component
 * @author GYX xiao sb
 * @date 2023/3/29
 */

import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const Subsequences = (props) => {
    return (
        <Fragment>
            {props.sequence.length !==0 &&
                <div className="md-max:hidden absolute flex flex-col justify-center items-center py-4 w-full bg-white scale-0 group-hover/category:scale-100 z-30 transition-all duration-100 origin-top ease-linear">
                    {props.sequence.map((s, i) =>
                        <div key={i}
                             className="h-10 w-fit flex flex-col justify-center items-center cursor-pointer ">
                            <NavLink className={`group w-full ${(isActive) => isActive && ""}`}>
                                <span className="group-hover:underline group-hover:underline-offset-2 group-hover:text-lime-600">{s.name}</span>
                            </NavLink>
                        </div>
                    )}
                </div>
            }
        </Fragment>
    )
}
/**
 * End of Subsequences Component
 */
export default Subsequences