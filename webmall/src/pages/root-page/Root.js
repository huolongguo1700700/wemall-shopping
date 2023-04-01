/**
 * @Description Root Component
 * @author GYX xiao sb
 * @date 2023/3/30
 */

import React, { useMemo } from 'react'
import { Outlet } from "react-router-dom"
import tw from 'tailwind-styled-components'
import Header from './components/header/Header'
import { useToggle } from '../../hooks'
import AppContext from './Context'

const Root = () => {
    const [isOpen, setIsOpen, toggleOpen] = useToggle(false)      // if the nav button is a burger button
    const values = useMemo(
        () => ({ isOpen, setIsOpen, toggleOpen }),
        [isOpen, setIsOpen, toggleOpen]
    )
    
    return (
        <AppContext.Provider  value={values}>
            <div className="">
                <Header />
                <MainStyles>
                    <Outlet />
                </MainStyles>
            </div>
        </AppContext.Provider>
    )
}

const MainStyles = tw.div`
    mt-14 lg:mt-20
`
/**
 * End of Root Component
 */
export default Root