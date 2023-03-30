/**
 * @Description Burger Component
 * @author Shy
 * @date 19.08.2022
 */

import React, { useContext } from 'react'
import { isMobile } from 'react-device-detect'
import { useWindowSize } from '../../../../../hooks'
import OpenContext from '../../../Context'

const Burger = ({ color }) => {
    /* variables area */
    const { screenWidth } =  useWindowSize()                // get the window width
    
    /* Fetch Context from Burger Component for open the category lists for responsive design */
    const { isOpen, toggleOpen } = useContext(OpenContext)
    
    
    /* functions/methods area */
    // const mouseEnterHandler = () => setIsHover(true)
    // const mouseLeaveHandler = () => setIsHover(false)
    // const onClickHandler = () => setIsBurger(!isOpen)
    
    /* style conditions area */
    /* first and third lines styles:
    ...if it's in burger shape:
       1. when mouse hover and using windows, translate the line to the right/left a little,
       2. when mouse leave, restore the displacement styles
    ...if it was clicked and not a burger now:
       ...just make the two lines rotate and then move up or down in order to become a cross
     */
    const firstLineStyles = (!isOpen ?  !isMobile && screenWidth > 1024 && 'translate-x-1'
                                        :
                                        'rotate-[225deg] translate-y-[7px]')
    const thirdLineStyles = (!isOpen ?  !isMobile && screenWidth > 1024 && '-translate-x-1'
                                        :
                                        '-rotate-[225deg] -translate-y-[7px]')
    // the style of middle line: just disappear when button is not a burger and showing a cross
    const midLineStyle = (isOpen && 'translate-x-2 opacity-0')
    
    return (
        <>
            <div className={`flex flex-col h-full w-full text-amber-50 cursor-pointer z-50 group`}
                 onClick={toggleOpen}       // if click the button, set reverse boolean status
            >
                <span className={`${color} h-[1px] w-5 my-1.5 duration-300 ease-in-out ${firstLineStyles} group-hover:bg-white`}>
                </span>
                    <span className={`${color} h-[1px] w-5 duration-300 ease-in-out ${midLineStyle} group-hover:bg-white`}>
                </span>
                    <span className={`${color} h-[1px] w-5 my-1.5 duration-300 ease-in-out ${thirdLineStyles} group-hover:bg-white`}>
                </span>
            </div>
        </>
    )
}
/**
 * End of Burger Component
 */
export default Burger