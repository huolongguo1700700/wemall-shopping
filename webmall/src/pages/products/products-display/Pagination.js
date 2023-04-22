/**
 * @Description Pagination Component
 * @author GYX xiao sb
 * @date 2023/4/22
 */

import React from 'react'

const Pagination = ({ currentPage, setCurrentPage }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1)
    }
    return (
        <div className="pagination">
            <button onClick={handlePrevPage}>上一页</button>
            <span>当前页: {currentPage}</span>
            <button onClick={handleNextPage}>下一页</button>
        </div>
    )
}
/**
 * End of Pagination Component
 */
export default Pagination