/**
 * @Description Subsequences Component
 * @author GYX xiao sb
 * @date 2023/3/29
 */

import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Subsequences = (props) => {
    return (
        <Fragment>
            {props.sequence.length !==0 &&
                <div className="absolute py-6 w-full bg-white scale-0 group-hover/category:scale-100 z-50 transition-all duration-100 origin-top ease-linear">
                    {props.sequence.map((s, i) =>
                        <div key={i}
                             className="py-1 h-10 flex flex-col justify-center items-center cursor-pointer">
                            <Link className="hover:border-b-2 hover:text-lime-600 border-lime-600 w-full md:w-1/3">
                                {s.name}
                            </Link>
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