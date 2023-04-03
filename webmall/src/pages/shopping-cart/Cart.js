/**
 * @Description Cart Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, removeAllItems } from '../../stores/cart/cartSlice'
import { selectAll, selectTotalPrice } from '../../stores/cart/cartSelectors'
import AddCart from '../../features/add-to-cart/AddCart'
import { NavLink } from 'react-router-dom'

const Cart = () => {
    const cartItems = useSelector(selectAll)
    
    const totalPrice = useSelector(selectTotalPrice).toFixed(2)
    
    const dispatch = useDispatch()
    return (
        <div className="flex flex-col">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div>
                    <p>Your cart is empty. </p>
                    <NavLink to={`/collections`}>Continue Shopping</NavLink>
                </div>
                
            ) : (
                <div>
                    <div className="flex font-bold py-2">
                        <div className="w-1/3">Product</div>
                        <div className="w-1/4">Price</div>
                        <div className="w-1/4">Quantity</div>
                        <div className="w-1/4">Total</div>
                    </div>
                    {cartItems && cartItems.map((item, i) => (
                        <div key={i} className="flex py-2">
                            <div className="w-1/3">{item.name}</div>
                            <div className="w-1/4">{item.price} €</div>
                            <div className="w-1/4 flex justify-center">
                                <AddCart product={item} disabled={false} />
                            </div>
                            <div className="w-1/4">{(item.price * item.quantity).toFixed(2)} €</div>
                            <div>
                                <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <p>Total Price: {totalPrice} €</p>
                    </div>
                    <div>
                        <button onClick={() => dispatch(removeAllItems())}>Clear Cart</button>
                    </div>
                    <div>
                        <button>Checkout</button>
                    </div>
                    <div>
                        <NavLink to={`/collections`}>Continue Shopping</NavLink>
                    </div>
                </div>
            )}
        </div>
    )
}
/**
 * End of Cart Component
 */
export default Cart