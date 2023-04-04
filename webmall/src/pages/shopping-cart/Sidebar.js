/**
 * @Description Sidebar Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const Sidebar = ({ totalPrice }) => {
    return (
        <div className="sticky top-20 h-[calc(100vh-5rem)] w-[400px] bg-white lg-max:hidden px-5 pt-8">
            <div className="flex flex-col w-full h-[28rem] justify-between items-center">
                <div className="w-full">
                    <div className="text-2xl mb-12 ">Summary</div>
        
                    <div className="flex flex-row justify-between items-center border-b-2 border-gray-150">
                        <div>Shopping</div>
                        <div>€{totalPrice}</div>
                    </div>
                </div>
                <ButtonBox className="w-full">
                    <NavLink className={ButtonStyles} to={`/collections`}>Continue Shopping</NavLink>
                </ButtonBox>
            </div>
        </div>
    )
}
const ButtonStyles = `
    w-full h-12
    flex justify-center items-center
    bg-lime-500
    hover:bg-green-700
    text-white
    
`

const ButtonBox = tw.div`

`
/**
 * End of Sidebar Component
 */
export default Sidebar