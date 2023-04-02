/**
 * @Description Cart Component
 * @author GYX xiao sb
 * @date 27.03.2023
 */

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '../../stores/cart/cartSelectors'
import { removeItem, removeAllItems } from '../../stores/cart/cartSlice'
import AddCart from '../../features/add-to-cart/AddCart'

const Cart = () => {
    const cartItems = useSelector(selectCartItems)
    const dispatch = useDispatch()
    
    return (
        <div className="flex flex-col">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="flex font-bold py-2">
                        <div className="w-1/3">Product</div>
                        <div className="w-1/4">Price</div>
                        <div className="w-1/4">Quantity</div>
                        <div className="w-1/4">Total</div>
                    </div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex py-2">
                            <div className="w-1/3">{item.name}</div>
                            <div className="w-1/4">{item.price} €</div>
                            <div className="w-1/4 flex justify-center">
                                <AddCart itemId={item.id} />
                            </div>
                            <div className="w-1/4">{(item.price * item.quantity).toFixed(2)} €</div>
                            <div>
                                <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button onClick={() => dispatch(removeAllItems())}>Clear Cart</button>
                    </div>
                    <div>
                        <button>Checkout</button>
                    </div>
                    <div>
                        <button>Continue Shopping</button>
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