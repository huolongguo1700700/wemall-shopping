/**
 * @Description Cart Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectAll, selectTotalPrice } from '../../stores/cart/cartSelectors'
import Footer from '../root-page/components/footer/Footer'
import Sidebar from './Sidebar'
import CartItem from './CartItem'
import CartTitle from './CartTitle'
import { useScrollTop } from '../../hooks'
import StyledMain from '../../assets/cart-profile-structure/StyledMain'
import StyledContainer from '../../assets/cart-profile-structure/StyledContainer'
import StyledContents from '../../assets/cart-profile-structure/StyledContents'

const Cart = () => {
    useScrollTop()
    
    const cartItems = useSelector(selectAll)
    
    const totalPrice = useSelector(selectTotalPrice).toFixed(2)
    
    return (
        <StyledMain>
                <StyledContainer>
                    <StyledContents>
                        <CartTitle />
                        {cartItems && cartItems.length !== 0 ?
                            cartItems.map((p, i) => (
                                <CartItem key={i} p={p} />
                            ))
                            :
                            <div className="h-[calc(80vh-8rem)] flex flex-col justify-center items-center text-2xl gap-6">
                                <div className="text-3xl">Empty Cart!</div>
                                <NavLink className="cursor-pointer hover:text-green-500" to={`/collections`}>
                                    Add the first product to the shopping cart
                                </NavLink>
                            </div>
                        }
                    </StyledContents>
                    <Footer />
                </StyledContainer>
                <Sidebar totalPrice={totalPrice} />
        </StyledMain>
    )
}
/**
 * End of Cart Component
 */
export default Cart