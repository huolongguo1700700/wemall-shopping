/**
 * @Description Cart Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { selectAll, selectTotalPrice } from '../../stores/cart/cartSelectors'
import Header from '../root-page/components/header/Header'
import Footer from '../root-page/components/footer/Footer'
import Sidebar from './Sidebar'
import CartItem from './CartItem'
import CartTitle from './CartTitle'

const Cart = () => {
    const cartItems = useSelector(selectAll)
    
    const totalPrice = useSelector(selectTotalPrice).toFixed(2)
    
    return (
        <div className="flex flex-col justify-center items-center">
            <Header />
            <div className="flex flex-row w-full max-w-[1920px] h-full mt-14 lg:mt-20">
                <div className="flex flex-col h-full w-full m-5 gap-5">
                    <div className="flex w-full h-full bg-white p-3 justify-center items-start">
                        <div className="flex-col w-full h-full min-h-[80vh] max-w-7xl">
                            <CartTitle />
                            
                            {cartItems && cartItems.map((p, i) => (
                                <CartItem key={i} p={p} />
                            ))}
                        </div>
                    </div>
                    <Footer />
                </div>
                <Sidebar totalPrice={totalPrice} />
            </div>
        </div>
    )
}
/**
 * End of Cart Component
 */
export default Cart