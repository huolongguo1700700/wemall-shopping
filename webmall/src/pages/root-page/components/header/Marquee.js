/**
 * @Description Marquee Component
 * @author GYX xiao sb
 * @date 2023/3/29
 */

import React from 'react'

const Marquee = () => {
    return (
        <div className="flex flex-col w-full h-6 lg:h-8 bg-lime-100 lg:bg-lime-300 dark:bg-green-900 dark:lg:bg-green-800 dark:text-lime-50">
            <div className="h-full animate-scroll absolute top-0 w-full flex justify-around z-0 items-center">
                <h2 className="ml-2">Free delivery on all orders over €60</h2>
                <h2 className="ml-2">Free delivery on all orders over €60</h2>
            </div>
            {/* Set a button to close the Component */}
            {/*<div className="flex flex-col cursor-pointer absolute right-3 z-10">
                <span className="inline-block h-[1px] w-4 bg-black rotate-45 translate-y-[1px]"></span>
                <span className="inline-block h-[1px] w-4 bg-black -rotate-45"></span>
            </div>*/}
        </div>
    )
}
/**
 * End of Marquee Component
 */
export default Marquee