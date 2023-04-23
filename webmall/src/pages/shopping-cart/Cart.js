/**
 * @Description Cart Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { selectAll, selectTotalPrice } from '../../stores/cart/cartSelectors'
import Sidebar from './Sidebar'
import CartItem from './CartItem'
import CartTitle from './CartTitle'
import Footer from '../root-page/footer/Footer'
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
                            (<div className={`min-h-[calc(80vh-5rem)]`}>
                                {cartItems.map((p, i) => (
                                <CartItem key={i} p={p} />
                                ))}
                            </div>)
                            :
                            <div className="min-h-[calc(80vh-5rem)] flex flex-col justify-center items-center lg:text-2xl gap-6">
                                <div className="text-2xl lg:text-3xl">Empty Cart!</div>
                                <NavLink className="cursor-pointer hover:text-green-500 text-center" to={`/collections`}>
                                    Add the first product to the shopping cart
                                </NavLink>
                            </div>
                        }
                        <Sidebar deviceHidden={false} totalPrice={totalPrice} />
                    </StyledContents>
                    
                    <Footer />
                </StyledContainer>
                <Sidebar deviceHidden={true} totalPrice={totalPrice} />
        </StyledMain>
    )
}
/**
 * End of Cart Component
 */
export default Cart