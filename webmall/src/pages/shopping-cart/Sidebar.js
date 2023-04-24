/**
 * @Description Sidebar Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React, { Fragment, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import tw from 'tailwind-styled-components'
import { selectUser, selectUserIsLogin } from '../../stores/user/userSelectors'
import { postProductsToCart } from '../../api/client'
import StyledSidebar from '../../assets/cart-profile-structure/StyledSidebar'
import Modal from '../../features/modal/Modal'

const Sidebar = ({totalPrice, deviceHidden}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, setMessage] = useState("")
    
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
    
    const handleModalConfirm = () => {
        setIsModalOpen(false)
        message === "Purchase Success!" ?
            navigate(`/profile/order`)
            :
            message === "Add product first!" ?
                navigate('/collections')
                :
            message === "Please Login first!"&&
                navigate('/login', { state: { returnUrl: '/cart' } })
    }
    
    const handleCheckout = useCallback((cart) => {
        const carts = cart.cart && cart.cart.map((c) => {
            return {
                "productId": c.id,
                "count": c.quantity,
            }
        })
        if (isLogin) {
            if (carts.length !== 0) {
                dispatch(postProductsToCart({
                    carts: carts,
                    userId: user.id && user.id
                }))
                setIsModalOpen(true)
                setMessage("Purchase Success!")
            }
            else {
                setIsModalOpen(true)
                setMessage("Add product first!")
            }
        }
        else {
            setIsModalOpen(true)
            setMessage("Please Login first!")
        }
    }, [isLogin, user, dispatch, navigate])
    
    return (
        <Fragment>
            {isModalOpen &&
                <Modal
                    isOpen={isModalOpen}
                    onConfirm={handleModalConfirm}
                    title={message}
                    isNotice={true}
                />
            }
            <StyledSidebar deviceHidden={deviceHidden}>
                <div className="lg:w-full">
                    <div className="lg-max:hidden text-2xl lg:mb-12">Summary</div>
                    
                    <div
                        className="lg-max:hidden flex flex-row justify-center lg:justify-between items-center border-b-2 border-gray-150">
                        <div>Shopping</div>
                        <div>€{totalPrice}</div>
                    </div>
                </div>
                <ButtonBox>
                    <NavLink className={`${ButtonStyles} bg-green-500 lg-max:hidden`} to={`/collections`}>Continue Shopping</NavLink>
                    <div className={`${ButtonStyles} bg-green-700 dark:bg-green-400 lg-max:bg-green-500}`} onClick={() => handleCheckout(cart)}>
                        {showCheckout()}
                        <div className="lg:hidden">
                            Shopping €{totalPrice}
                        </div>
                    </div>
                </ButtonBox>
            </StyledSidebar>
        </Fragment>
    )
}
const ButtonStyles = `
    w-full h-12
    flex flex-row lg-max:px-5 justify-between lg:justify-center items-center
    hover:bg-green-600 cursor-pointer
    text-white
`

const ButtonBox = tw.div`
    w-full flex flex-col
    justify-center items-center
    gap-5
`
/**
 * End of Sidebar Component
 */
export default Sidebar