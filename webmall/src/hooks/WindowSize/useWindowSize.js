/**
 * @Description custom useWindowSize hook
 * @author GYX xiao sb
 * @date 20.08.2022
*/

import { useEffect, useState } from 'react'

export const useWindowSize = () =>{
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        
        window.addEventListener('resize', handleResize)
        
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    
    return windowSize
}
    

