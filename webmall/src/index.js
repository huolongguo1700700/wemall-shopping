import React from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import { router } from './features/router/Router'
import './index.css'
import store from './stores'
import { Provider } from 'react-redux'

// Initialize the client
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals