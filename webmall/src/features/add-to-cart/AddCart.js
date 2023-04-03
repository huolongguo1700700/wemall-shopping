/**
 * @Description AddCart Component
 * @author GYX xiao sb
 * @date 2023/4/2
 */

import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { BiPlus, BiMinus } from "react-icons/bi"
import { setItemQty } from '../../stores/cart/cartSlice'

const AddCart = ({ product, url, disabled:isDisabled }) => {
    /* Get info in Redux state */
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)
    const cartItem = cart.find((item) => item.id === product.id)
    
    const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0)
    
    const imageUrl = url ? url : '';
    /* Initialize the product data for shopping cart */
    const initProduct = {
        id: product.id,
        image: imageUrl,
        name: product.name,
        price: product.price,
    }
    
    const handleIncrement = () => {
        setQuantity(quantity + 1)
        dispatch(setItemQty({ ...initProduct, quantity: quantity + 1 }))
    }
    
    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
            dispatch(setItemQty({ ...initProduct, quantity: quantity - 1 }))
        }
    }
    
    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity >= 0 && newQuantity <= 100) {
            setQuantity(newQuantity);
            dispatch(setItemQty({ ...initProduct, quantity: newQuantity }));
        }
    }
    
    return (
        <div className="flex justify-center items-center gap-2">
            <ButtonStyles onClick={handleDecrement} disabled={!quantity} $q={!quantity}>
                <BiMinus />
            </ButtonStyles>
            <NumberStyles
                className="block w-full px-3 py-2 rounded-md appearance-none focus:outline-none text-center focus:ring-blue-500 focus:border-blue-500"
                type="number"
                placeholder=""
                value={quantity}
                onChange={handleChange}
                min="0"
                max="99"
                disabled={isDisabled}
            />
            <ButtonStyles onClick={handleIncrement} $q={!quantity}>
               <BiPlus />
            </ButtonStyles>
        </div>
    )
}


const NumberStyles = tw.input`
    w-full px-3 py-2
    text-3xl text-center
    block appearance-none
    rounded-xl
    focus:outline-none focus:ring-blue-500 focus:border-blue-500
`
const ButtonStyles = tw.button`
    text-4xl
    p-2
    rounded-2xl
    cursor-pointer disabled:cursor-not-allowed disabled:text-gray-700/30 disabled:bg-stone-200/30
    rounded hover:bg-lime-300 hover:text-green-700
    ${(q) => (q.$q ? "bg-stone-200/80 text-gray-700" : "bg-lime-200/60 text-green-800") }
`
/**
 * End of AddCart Component
 */
export default AddCart