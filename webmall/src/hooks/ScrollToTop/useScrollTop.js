import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export const useScrollTop = () => {
    const location = useLocation()
    
    useEffect(() => {
        if (location.pathname !== '/collections/product-info/:productID/:categoryID') {
            window.scrollTo(0, 0)
        }
    }, [location])
}
