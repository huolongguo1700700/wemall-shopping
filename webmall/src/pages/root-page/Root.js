/**
 * @Description Root Component
 * @author GYX xiao sb
 * @date 2023/3/30
 */

import React from 'react'
import { Outlet } from "react-router-dom"
import tw from 'tailwind-styled-components'
import Header from './header/Header'
import Footer from './footer/Footer'

const Root = () => {
    return (
        <div className="flex flex-col">
            <Header/>
            <MainStyles>
                <Outlet/>
            </MainStyles>
            <Footer/>
        </div>
    
    )
}

const MainStyles = tw.div`
    mt-14 lg:mt-20
`
/**
 * End of Root Component
 */
export default Root