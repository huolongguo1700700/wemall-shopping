/**
 * @Description AddCart Component
 * @author GYX xiao sb
 * @date 2023/4/2
 */

import React from 'react'
import tw from 'tailwind-styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { BiPlus, BiMinus } from "react-icons/bi"
import { setItemQty } from '../../stores/cart/cartSlice'
import { selectProductQty } from '../../stores/cart/cartSelectors'

const AddCart = ({ product, url, disabled:isDisabled, background }) => {
    /* Get info in Redux state */
    const dispatch = useDispatch()
    
    /* Fetch the quantity of this product */
    const fetchQty = useSelector(selectProductQty(product.id))
    
    const imageUrl = url ? url : '';
    /* Initialize the product data for shopping cart */
    const initProduct = {
        id: product.id,
        image: imageUrl,
        name: product.name,
        price: product.price,
    }
    
    const handleIncrement = () => {
        dispatch(setItemQty({ ...initProduct, quantity: fetchQty + 1 }))
    }
    
    const handleDecrement = () => {
        if (fetchQty > 0) {
            dispatch(setItemQty({ ...initProduct, quantity: fetchQty - 1 }))
        }
    }
    
    const handleChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity >= 0 && newQuantity < 100) {
            dispatch(setItemQty({ ...initProduct, quantity: newQuantity }));
        }
    }
    
    return (
        <div className="flex flex-row w-full justify-center items-center gap-2">
            <ButtonStyles onClick={handleDecrement} disabled={!fetchQty} $q={!fetchQty}>
                <BiMinus />
            </ButtonStyles>
            <NumberStyles
                type="number"
                placeholder=""
                value={fetchQty && fetchQty}
                onChange={handleChange}
                min="0"
                max="99"
                disabled={isDisabled}
                $bg={background}
            />
            <ButtonStyles onClick={handleIncrement} $q={!fetchQty}>
               <BiPlus />
            </ButtonStyles>
        </div>
    )
}


const NumberStyles = tw.input`
    ${(p) => p.$bg ? p.$bg : "bg-transparent"}
    w-12 md:w-20 lg:w-24 sm:py-2
    text-xl lg:text-3xl text-center
    block appearance-none
    rounded-xl
    focus:outline-none focus:ring-blue-500 focus:border-blue-500
`
const ButtonStyles = tw.button`
    lg:text-4xl text-2xl
    p-1 sm:p-2
    rounded-2xl
    cursor-pointer disabled:cursor-not-allowed disabled:text-gray-700/30 disabled:bg-stone-200/30
    rounded hover:bg-lime-300 hover:text-green-700
    ${(p) => (p.$q ? "bg-stone-200/80 text-gray-700" : "bg-lime-200/60 text-green-800") }
`
/**
 * End of AddCart Component
 */
export default AddCart