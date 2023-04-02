/**
 * @Description Router configuration
 * @author GYX xiao sb
 * @date 28.03.2023
 */

import { createBrowserRouter } from 'react-router-dom'
import App from '../../App'
import Error from '../../pages/error-page/Error'
import CategoryProducts from '../../pages/products/category-products/CategoryProducts'
import Collections from '../../pages/root-page/components/main/Collections'
import ProductDetail from '../../pages/products/product-detail/ProductDetail'


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children:[
            {
                path: "/",
                element: <Collections />,
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
                path: "collections/product/:productID/:categoryID",
                element: <ProductDetail />,
            }
        ]
    },
])

/* End of Router Settings */