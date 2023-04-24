/**
 * @Description OrderDisplay Component
 * @author GYX xiao sb
 * @date 2023/4/15
 */

import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setOrderID } from '../../stores/orders/orderSlice'
import { useDispatch } from 'react-redux'
import Modal from '../../features/modal/Modal'
import { deleteOrder } from '../../api/client'
import './order.css'

const OrderDisplay = ({order, isBriefly}) => {
    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    
    function formatDate(dateString) {
        const date = new Date(dateString)
        const day = String(date.getDate()).padStart(2, '0')
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const year = date.getFullYear()
        
        return `${day}/${month}/${year}`
    }
    
    const timestamp = new Date(order.createdAt).getTime()
    
    /* Modal variables */
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const handleDeleteClick = () => {
        setIsModalOpen(true)
    }
    
    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    
    const handleConfirmDelete = async () => {
        setIsModalOpen(false)
        try {
            await dispatch(deleteOrder(order.orderId))
        }
        catch (e) {
            console.error(e)
            throw new Error(e.message)
        }
        
        setTimeout(() => {
            navigate('/profile')
        }, 0)
    }
    
    return (
        <Fragment>
            {isModalOpen &&
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmDelete}
                    title={"Confirm Deletion"}
                    description={"Are you sure you want to delete this order?"}
                />
            }
            <div className={`max-w-5xl w-full h-full p-5 border mb-8 ${order.isDeleted ? "bg-gray-100 text-gray-400 dark:bg-green-900 border-gray-200" : "border-gray-300"}`}>
                {/* Order Details */}
                <div className="flex flex-col w-full h-full lg:flex-row justify-between border-b border-gray-300 pb-3">
                    {/* Order Number */}
                    <div className="flex w-full gap-1 font-medium text-lg">
                        <span>Order</span>
                        <span>Number</span>
                        <span>:</span>
                        <span>{`${timestamp}${order.orderId}`}</span>
                    </div>
                    <div className="flex flex-col w-full lg:flex-row gap-1 lg:gap-3 text-sm lg:text-md lg:justify-end">
                        {/* Order Status */}
                        <div className="flex gap-1">
                            <span>Order</span>
                            <span>Status</span>
                            <span>:</span>
                            {order.isDeleted ?
                                <span>Deleted</span>
                                :
                                <span>Accepted</span>
                            }
                        </div>
                        {/* Order Create Date */}
                        <span className="h-2/3 w-0.5 bg-slate-500/60 dark:bg-slate-300/60 lg-max:hidden"></span>
                        <div className="flex gap-1">
                            <span>Order</span>
                            <span>Date</span>
                            <span>:</span>
                            <span>{formatDate(order.createdAt)}</span>
                        </div>
                        {/* Order products amount */}
                        <span className="h-2/3 w-0.5 bg-slate-500/60 dark:bg-slate-300/60 lg-max:hidden"></span>
                        <div className="flex gap-1">
                            <span>Total</span>
                            <span>Products</span>
                            <span>:</span>
                            <span>{order.products?.length}</span>
                        </div>
                        <span className="h-2/3 w-0.5 bg-slate-500/60 dark:bg-slate-300/60 lg-max:hidden"></span>
                        {/* Order price */}
                        <div className="flex gap-1">
                            <span>Total</span>
                            <span>Price</span>
                            <span>:</span>
                            <span>{order.totalPrice}</span>
                        </div>
                    </div>
                </div>
                {/* Display order products, only 3 in main Orders page */}
                <div className=" w-full h-full flex flex-col gap-3 lg:gap-5 py-5">
                    {order.products?.slice(0, isBriefly ? 3 : order.products.length).map((p, i) => {
                        return (
                            <div key={i} className="flex gap-2 lg:gap-8 w-full h-full">
                                <div className={`w-20 h-20 lg:w-32 lg:h-32 bg-white flex items-center justify-center ${order.isDeleted && "grayscale-[80%]"}`}>
                                    <img className="w-20 h-20 lg:w-32 lg:h-32 object-contain min-w-[5rem] min-h-[5rem] lg:min-w-[8rem] lg:min-h-[8rem]" src={p.image.url} alt={p.name}/>
                                </div>
                                <div className="">
                                    <div className="h-16 lg:h-20 flex flex-col text-sm md:text-md lg:text-lg">
                                        <span className="">{p.name}</span>
                                        <span>€{p.price}</span>
                                    </div>
                                    <div className="flex gap-1 text-xs lg:text-sm text-gray-500 dark:text-gray-300">
                                        <span>Quantity:</span>
                                        <span>{p.count}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* Order operation buttons */}
                <div className="bg-transparent flex justify-between items-center ">
                    {isBriefly &&
                        <Link className={`${LinkStyles} ${order.isDeleted && "disabled-button"}`} to={`/profile/order`} onClick={() => dispatch( setOrderID(order.orderId))}>
                            <span>View</span>
                            <span>Order</span>
                        </Link>
                    }
                    <button className={`${LinkStyles} ${order.isDeleted && "hidden"}`} onClick={handleDeleteClick}>
                        <span>Cancel</span>
                        <span>Order</span>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}
const  LinkStyles = `
    flex justify-center items-center gap-1 lg:gap-2
    w-24 h-10 lg:w-32 lg:h-12
    text-sm lg:text-lg
    border-2 border-gray-300
    hover:bg-green-500
    hover:text-lime-50 dark:hover:bg-green-400 dark:hover:text-lime-800
    disabled:cursor-not-allowed
`
/**
 * End of OderDisplay Component
 */
export default OrderDisplay