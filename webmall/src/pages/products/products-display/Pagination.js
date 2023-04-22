/**
 * @Description Pagination Component
 * @author GYX xiao sb
 * @date 2023/4/22
 */

import React from 'react'
import { useScrollTop } from '../../../hooks'
import { useNavigate } from 'react-router-dom'

const Pagination = ({ currentPage, totalPages, baseUrl }) => {
    useScrollTop()
    
    const navigate = useNavigate()
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            navigate(`${baseUrl}?page=${currentPage - 1}`)
        }
    }
    
    const handleNextPage = () => {
        navigate(`${baseUrl}?page=${currentPage + 1}`)
    }
    
    return (
        <div className="">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Last</button>
            <span>Current page: {currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
    )
}
/**
 * End of Pagination Component
 */
export default Pagination