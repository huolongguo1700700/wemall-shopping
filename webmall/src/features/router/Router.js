/**
 * @Description Router configuration
 * @author GYX xiao sb
 * @date 28.03.2023
 */

import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Error from '../../pages/error-page/Error'
import Products from '../../pages/products/all-products/Products'
import Cart from '../../pages/shopping-cart/Cart'
import Root from '../../pages/root-page/Root'
import ProductsByCategory from '../../pages/products/products-by-category/ProductsByCategory'
import ProductInfo from '../../pages/products/product-info/ProductInfo'
import Login from '../../pages/login/Login'
import Profile from '../../pages/user-profile/Profile'

export const router = createBrowserRouter([
    {
        element: <App />,
        errorElement: <Error />,
        children:[
            {
                element: <Root />,
                children: [
                    {
                        path: "/",
                        element: <Products />
                    },
                    {
                        path: "/collections",
                        element: <Products />,
                    },
                    {
                        path: "/collections/:categoryName/:categoryID",
                        element: <ProductsByCategory />,
                    },
                    {
                        path: "/collections/product-info/:productID/:categoryID",
                        element: <ProductInfo />,
                    },
                    {
                        path: "/login",
                        element: <Login />
                    },
                    {
                        path: "/profile",
                        element: <Profile />
                    }
                ]
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ]
    },
])

/* End of Router Settings */