/**
 * @Description Sidebar Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import { selectUser, selectUserIsLogin } from '../../stores/user/userSelectors'
import { postProductsToCart } from '../../api/client'
import StyledSidebar from '../../assets/cart-profile-structure/StyledSidebar'

const Sidebar = ({ totalPrice }) => {
    const dispatch = useDispatch()
    /* Select cart */
    const cart = useSelector((state) => state.cart)
    /* If user login */
    const isLogin = useSelector(selectUserIsLogin)
    const user = useSelector(selectUser)
    
    const navigate = useNavigate()
    
    const showCheckout = () => {
        switch (cart.status) {
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
    const data = {
        "carts": [
            {
                "productId": 1,
                "count": 1,
            },
            {
                "productId": 2,
                "count": 1,
            },
        ],
        "userId": 1
    }
    
    const handleCheckout = useCallback((c) => {
        console.log(user)
        if(isLogin){
            c && c.forEach((c) => {
                dispatch(postProductsToCart({
                    "productId": c.id,
                    "count": c.quantity,
                    "userId": user.user.id
                }))
            })
        }
        else {
            alert("Please Login first")
            setTimeout(() => {
                navigate('/login', { state: { returnUrl: '/cart' } })
            }, 0)
        }
    }, [isLogin, user, dispatch, navigate])
    
    return (
        <StyledSidebar>
            <div className="w-full">
                <div className="text-2xl mb-12 ">Summary</div>
                
                <div className="flex flex-row justify-between items-center border-b-2 border-gray-150">
                    <div>Shopping</div>
                    <div>€{totalPrice}</div>
                </div>
            </div>
            <ButtonBox>
                <NavLink className={`${ButtonStyles} bg-green-500`} to={`/collections`}>Continue Shopping</NavLink>
                <NavLink className={`${ButtonStyles} bg-green-700 }`} onClick={() => handleCheckout(cart.cart)}>
                    {showCheckout}
                </NavLink>
            </ButtonBox>
        </StyledSidebar>
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