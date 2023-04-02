/**
 * @Description AddCart Component
 * @author GYX xiao sb
 * @date 2023/4/2
 */

import React, { useMemo, useState } from 'react'
import tw from 'tailwind-styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { BiPlus, BiMinus } from "react-icons/bi"
import { setItemQty } from '../../stores/cart/cartSlice'

const AddCart = ({ product, disabled }) => {
    /* Get info in Redux state */
    const dispatch = useDispatch()
    const item = useSelector(state => state.cart.items.find(item => item.id === product.id))
    
    const initialQuantity = useMemo(() => item?.quantity || 0, [item])
    const [quantity, setQuantity] = useState(initialQuantity)
    
    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value)
        if (newQuantity >= 0) {
            setQuantity(newQuantity)
            dispatch(setItemQty({ id: product.id, quantity: newQuantity }))
        }
    }
    
    const handleIncrement  = () => {
        const productInfo = item ? {} : {
            name: product.name,
            imageUrl: "",
            price: product.price
        }
        console.log(productInfo, product.images )
        setQuantity(quantity + 1)
        dispatch( setItemQty({ id: product.id, quantity: quantity + 1, productInfo }))
    }
    
    const decrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
            dispatch(setItemQty({ id: product.id, quantity: quantity - 1 }))
        }
    }
    
    
    return (
        <div className="flex justify-center items-center gap-2">
            <ButtonStyles onClick={decrement} disabled={!quantity} $q={!quantity}>
                <BiMinus />
            </ButtonStyles>
            <NumberStyles
                className="block w-full px-3 py-2 rounded-md appearance-none focus:outline-none text-center focus:ring-blue-500 focus:border-blue-500"
                type="number"
                placeholder=""
                value={quantity}
                onChange={handleChange}
                min="0"
                disabled={disabled}
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