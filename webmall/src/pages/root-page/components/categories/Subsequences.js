/**
 * @Description Subsequences Component
 * @author GYX xiao sb
 * @date 2023/3/29
 */

import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const Subsequences = (props) => {
    return (
        <Fragment>
            {props.sequence.length !==0 &&
                <OuterContainerStyles>
                    {props.sequence.map((s, i) =>
                        <InnerContainerStyles key={i}>
                            <NavLink className={({ isActive }) => isActive ? `${SelfNavLinkStyles} ${SelfActiveLinkStyles}` : `${SelfNavLinkStyles}`}
                                     to={`/collections/${s.name}/${s.id}`}
                            >
                                <LetterStyles>{s.name}</LetterStyles>
                            </NavLink>
                        </InnerContainerStyles>
                    )}
                </OuterContainerStyles>
            }
        </Fragment>
    )
}
const OuterContainerStyles = tw.div`
    lg-max:hidden
    absolute
    flex flex-col
    justify-center
    items-center
    w-full
    py-4
    bg-white
    scale-0 group-hover/category:scale-100 transition-all duration-100 origin-top ease-linear
    z-30
    border border-emerald-500 border-t-0
`

const InnerContainerStyles = tw.div`
    flex flex-col justify-center items-center
    h-10
    w-fit
    cursor-pointer
`

const SelfNavLinkStyles = `
    group w-full
`

const SelfActiveLinkStyles = `
    underline underline-offset-2
    text-lime-600
`

const LetterStyles = tw.span`
    group-hover:underline
    group-hover:underline-offset-2
    group-hover:text-lime-600
`

/**
 * End of Subsequences Component
 */
export default Subsequences