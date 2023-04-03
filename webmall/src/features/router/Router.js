/**
 * @Description Router configuration
 * @author GYX xiao sb
 * @date 28.03.2023
 */

import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Error from '../../pages/error-page/Error'
import Products from '../../pages/products/all-products/Products'
import CategoryProducts from '../../pages/products/category-products/CategoryProducts'
import ProductDetail from '../../pages/products/product-detail/ProductDetail'
import Cart from '../../pages/shopping-cart/Cart'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children:[
            {
                path: "/",
                element: <Products />,
            },
            {
                path: "/collections",
                element: <Products />,
            },
            {
                path: "/collections/:categoryName/:categoryID",
                element: <CategoryProducts />,
            },
            {
                path: "/collections/product/:productID/:categoryID",
                element: <ProductDetail />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ]
    },
])

/* End of Router Settings */