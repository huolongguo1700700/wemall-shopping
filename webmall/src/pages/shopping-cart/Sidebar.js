/**
 * @Description Sidebar Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import { postProductsToCart } from '../../api/client'

const Sidebar = ({ totalPrice }) => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)
    
    const showCheckout = () => {
        switch (state.cart.status) {
            case 'processing':
                return <div>Processing</div>
            case 'succeeded':
                return <div>Succeeded</div>
            case 'failed':
                return <div>Failed</div>
            case 'checkout':
                return <div>Checkout</div>
            default:
                return 0
        }
    }
    
    const handleCheckout = (c) => {
        c.forEach((c) => {
            dispatch(postProductsToCart({
                "productId": c.id,
                "count": c.quantity,
                "OrderId": 1
            }))
        })
    }
    
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
                <ButtonBox>
                    <NavLink className={`${ButtonStyles} bg-green-500`} to={`/collections`}>Continue Shopping</NavLink>
                    <NavLink className={`${ButtonStyles} bg-green-700`} onClick={() => handleCheckout(state.cart.cart)}>
                        {showCheckout}
                    </NavLink>
                </ButtonBox>
            </div>
        </div>
    )
}
const ButtonStyles = `
    w-full h-12
    flex justify-center items-center
    hover:bg-green-600
    text-white
    
`

const ButtonBox = tw.div`
    w-full flex flex-col
    gap-5
`
/**
 * End of Sidebar Component
 */
export default Sidebar