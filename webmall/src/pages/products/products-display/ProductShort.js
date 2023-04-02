/**
 * @Description ProductShort Component
 * @author GYX xiao sb
 * @date 2023/4/2
 */

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFetchProduct from '../../../api/fetchProduct'

const ProductShort = ({ p }) => {
    /* Use Router to transfer parameters and navigate to Error page */
    const navigate = useNavigate()
    
    const { data:product, isLoading, error, isError } = useFetchProduct(p.id)
    
    /* Error and Loading states */
    if (isLoading) return <span>Products Loading...</span>
    if (isError) {
        console.log(error)
        navigate(`/Error`)
    }
    
    const info = product && product.product
    
    return product &&
            <div
                 className="flex p-1 w-full h-full bg-sky-100">
                {info.images.length !==0 &&
                    <img src={info.images[0].url} alt={info.name}
                         className={`w-36 h-36 object-contain`}/>
                }
                <Link to={`/collections/product/${p.id}/${p.category_id}`}
                      className="flex gap-2 w-fit bg-sky-100">
                    <p>{p.name}</p>
                    <p>{p.price} €</p>
                </Link>
            </div>
}
/**
 * End of ProductShort Component
 */
export default ProductShort