/**
 * @Description Router configuration
 * @author GYX xiao sb
 * @date 28.03.2023
 */

import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Error from '../../pages/error-page/Error'
import Product from '../../pages/products/product-info/Product'
import Products from '../../pages/products/all-product/Products'
import CategoryProducts from '../../pages/products/category-products/CategoryProducts'
import Collections from '../../pages/home/components/main/Collections'

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
                element: <Collections />,
            },
            {
                path: "/collections/:categoryName/:categoryID",
                element: <CategoryProducts />,
            },
            {
                path: "/product/:productID",
                element: <Product />,
            }
        ]
    },
])

/* End of Router Settings */