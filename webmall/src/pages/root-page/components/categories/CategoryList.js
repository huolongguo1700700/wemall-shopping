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

export const CategoryList = ({category, toggle, setSelectedCategory, closeCategories}) => {
    const handleClick = () => setSelectedCategory(toggle ? null : category.id)
    
    return (
        <Fragment>
            <InnerItemContainerStyles $id={category.id}>
                {/* Larger Screen Display */}
                <NavLink
                    className={({isActive}) => {
                        const baseClasses = `${NavLinkStyles}`
                        const activeClasses = isActive ? `${ActiveLinkStyles}` : ""
                        return `${baseClasses} ${activeClasses}`
                    }}
                    to={`/collections/${category.name}/${category.id}`}
                >
                    <div className="">{category.name}</div>
                </NavLink>
                
                {/* Mobile devices or Small Screen Display */}
                <div className={`flex flex-col h-full select-none  ${DeviceNavLinkStyles} `}>
                    {!category.id ?
                        <NavLink className={`text-lime-400 p-3 m-2 hover:bg-stone-500 ${HoverStyles}`}
                                 onClick={() => {
                                     handleClick()
                                     closeCategories()
                                 }}
                                 to="/collections"
                        >
                            {category.name}
                        </NavLink>
                        :
                        <Fragment>
                            <LetterStyles className={` ${HoverStyles} `} onClick={handleClick}>
                                {category.name}
                            </LetterStyles>
                            <DeviceOuterContainerStyles className={`${!toggle && "hidden"}`}>
                                <NavLink
                                    className={({isActive}) => isActive ? `${ActiveLinkStyles} ${HoverStyles}` : `${HoverStyles}`}
                                    to={`/collections/${category.name}/${category.id}`}
                                    onClick={closeCategories}
                                >
                                    Overview
                                </NavLink>
                                
                                <DeviceSubsequences
                                    sequence={category.subsequence}
                                    closeCategories={closeCategories}
                                />
                            </DeviceOuterContainerStyles>
                        </Fragment>
                    }
                </div>
                
                {/* Sub-Categories for Browser */}
                <Subsequences sequence={category.subsequence}/>
            
            </InnerItemContainerStyles>
        </Fragment>
    )
}

export const HoverStyles = `
    hover:text-lime-200
`

const InnerItemContainerStyles = tw.div`
    ${(p) => (p.$id === 0 && "lg:hidden")}
    lg:relative
    w-1/2 lg:w-full lg:h-full
    group/category
`

const NavLinkStyles = `
    flex
    w-full h-full
    group-hover/category:text-white
    group-hover/category:bg-lime-500
    cursor-pointer
    justify-center items-center
    lg-max:hidden
    
`
export const ActiveLinkStyles = `
    underline underline-offset-2
    text-lime-600
    lg-max:text-lime-500
    
`

const LetterStyles = tw.div`
    text-lime-400
    p-3
    m-2
    hover:bg-stone-500
`

const DeviceOuterContainerStyles = tw.div`
    flex flex-col
    gap-5
    pl-8
    py-3
`

const DeviceNavLinkStyles = `
    flex
    w-full h-full
    cursor-pointer
    text-lime-50
    lg:hidden
`

/**
 * End of Category Component
 */