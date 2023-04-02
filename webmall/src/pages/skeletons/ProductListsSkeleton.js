import React from "react"

const ProductSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col justify-center items-center min-w-sm max-w-lg w-full h-full p-3 py-6 mx-auto gap-8">
            <div className="bg-gray-300 w-56 h-56 "></div>
            <div className="bg-gray-300 mt-6 h-6 w-3/4"></div>
            <div className="bg-gray-300 mt-8 h-6 w-1/4"></div>
            <div className="bg-gray-300 mt-12 h-12 w-3/4"></div>
        </div>
    )
}

export default ProductSkeleton