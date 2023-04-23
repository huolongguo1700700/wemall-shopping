/**
 * @Description Pagination Component
 * @author GYX xiao sb
 * @date 2023/4/22
 */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import tw from 'tailwind-styled-components'

const Pagination = ({currentPage, totalPages, baseUrl}) => {
    const navigate = useNavigate()
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            navigate(`${baseUrl}?page=${currentPage - 1}`)
        }
    }
    const handleSidePage = (page) => {
        navigate(`${baseUrl}?page=${page}`)
    }
    
    const handleNextPage = () => {
        navigate(`${baseUrl}?page=${currentPage + 1}`)
    }
    
    return (
        
        <div className="flex flex-col items-center justify-center pb-12">
            <div className="flex items-center justify-center gap-2">
                <ButtonStyles onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </ButtonStyles>
                <ButtonStyles onClick={() => handleSidePage(1)} disabled={currentPage === 1}>
                    1
                </ButtonStyles>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                    <span>Showing</span>
                    <span className= "font-semibold mx-1 text-gray-900 dark:text-white">{currentPage}</span>
                    <span>of</span>
                    <span className="font-semibold mx-1 text-gray-900 dark:text-white">{totalPages}</span>
                    <span>Pages</span>
                </div>
                <ButtonStyles onClick={() => handleSidePage(totalPages)} disabled={currentPage === totalPages}>
                    {totalPages}
                </ButtonStyles>
                <ButtonStyles onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </ButtonStyles>
            </div>
        </div>
    
    )
}
const ButtonStyles = tw.button`
    cursor-pointer
    disabled:cursor-not-allowed
    px-4 py-2
    text-sm
    font-medium
    text-white
    bg-green-600 rounded
    hover:bg-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300 dark:hover:bg-gray-700 dark:hover:text-white
`
/**
 * End of Pagination Component
 */
export default Pagination