/**
 * @Description Order Component
 * @author GYX xiao sb
 * @date 2023/4/22
 */

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import useFetchOrder from '../../api/fetchOrder'
import { fetchSingleOrder } from '../../api/client'
import OrderDisplay from './OrderDisplay'

const Order = () => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    /* Fetch parameter from link */
    const { orderID } = useParams()
    
    useFetchOrder(orderID)
    
    /* Calling request API function and keep data by useQuery */
    const { data:order, isLoading, error, isError } = useQuery({
        queryKey:['order', orderID],
        queryFn:() => fetchSingleOrder(orderID),
        staleTime: Infinity
    })
    
    /* Error and Loading states */
    if (isLoading) return <span></span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    return (
        <div>
            {/*{JSON.stringify(order)}*/}
            <OrderDisplay products={order.products && order.products} />
        </div>
    )
}
/**
 * End of Order Component
 */
export default Order