/**
 * @Description CategoriesSkeleton Component
 * @author
 * @date 2023/4/3
 */

import React, { Fragment } from 'react'

const LoadingSkeleton = () => {
    
        return (
            <Fragment>
                <div className="fixed z-50 top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white opacity-75">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
                </div>
                <style jsx="true">{`
                    .loader {
                      animation: spin 1.5s linear infinite;
                    }
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }`}
                </style>
            </Fragment>
        )
}
/**
 * End of CategoriesSkeleton Component
 */
export default LoadingSkeleton