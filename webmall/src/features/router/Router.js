/**
 * @Description Router Component
 * @author GYX xiao sb
 * @date 28.03.2023
 */

import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Error from '../../pages/error-page/Error'
import Product from '../../pages/product-info/Product'
import Main from '../../pages/home/components/main/Main'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children:[
            {
                path: "/",
                element: <Main />,
            },
            {
                path: "/product/:productID",
                element: <Product />,
            }
        ]
    },
    
])

/* End of Router Settings */