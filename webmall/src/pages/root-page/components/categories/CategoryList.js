// noinspection JSValidateTypes

/**
 * @Description Category Component
 * @author GYX xiao sb
 * @date 2023/3/31
 */

import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import DeviceSubsequences from './DeviceSubsequences'
import Subsequences from './Subsequences'
import tw from 'tailwind-styled-components'

export const CategoryList = ({ category, toggle, setSelectedCategory }) => {
    
    const handleClick = () => setSelectedCategory(toggle ? null : category.id);
    
    return (
        <Fragment>
            <InnerItemContainerStyles>
                
                {/* Larger Screen Display */}
                <NavLink className={({ isActive }) => isActive ? `${NavLinkStyles} ${ActiveLinkStyles}` : `${NavLinkStyles}`}
                         to={`/collections/${category.name}/${category.id}`}
                >
                    <div className="">{category.name}</div>
                </NavLink>
                
                {/* Mobile devices or Small Screen Display */}
                <div className={`flex flex-col h-full ${DeviceNavLinkStyles} `}>
                    <LetterStyles className={` ${HoverStyles} `} onClick={handleClick} >
                        {category.name}
                    </LetterStyles>
                    <SubOuterContainerStyles className={`${!toggle && "hidden"}`}>
                        <NavLink className={({ isActive }) => isActive ? `${ActiveLinkStyles} ${HoverStyles}` : `${HoverStyles}`}
                                 to={`/collections/${category.name}/${category.id}`}
                        >
                            Overview
                        </NavLink>
    
                        <DeviceSubsequences
                            sequence={category.subsequence}
                        />
                    </SubOuterContainerStyles>
                </div>
                
                {/* Sub-Categories */}
                <Subsequences sequence={category.subsequence} />
                
            </InnerItemContainerStyles>
        </Fragment>
    )
}

export const HoverStyles = `
    hover:text-lime-200
`

const InnerItemContainerStyles = tw.div`
    md-max:w-2/3 w-full md:h-full
    group/category
`

const NavLinkStyles = `
    flex
    w-full h-full
    group-hover/category:text-white
    md:group-hover/category:bg-lime-500
    cursor-pointer
    md:justify-center md:items-center
    md-max:hidden
`
export const ActiveLinkStyles = `
    underline underline-offset-2
    text-lime-600
    md-max:text-lime-500
`

const LetterStyles =tw.div`
    text-lime-400
    p-3
    m-2
    hover:bg-stone-500
`

const SubOuterContainerStyles = tw.div`
    flex flex-col
    text-white
    gap-3
    pl-8
    py-3
`

const DeviceNavLinkStyles = `
    flex
    w-full h-full
    cursor-pointer
    text-lime-50
    md:hidden
`

/**
 * End of Category Component
 */