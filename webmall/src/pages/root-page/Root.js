// noinspection ES6CheckImport

/**
 * @Description Root Component
 * @author GYX xiao sb
 * @date 2023/3/30
 */

import React from 'react'
import { Outlet } from "react-router-dom"
import Header from './components/header/Header'
import { Categories } from './components/categories/Categories'
import { useToggle } from '../../hooks'
import OpenContext from './Context'

const Root = () => {
    const [isOpen, setIsOpen, toggleOpen] = useToggle(false)      // if the nav button is a burger button
    const values = { isOpen, setIsOpen, toggleOpen }
    return (
        <OpenContext.Provider  value={values}>
            <div className="flex flex-col h-full">
                <Header />
                <Categories />
                <Outlet />
            </div>
        </OpenContext.Provider>
    )
}
/**
 * End of Root Component
 */
export default Root