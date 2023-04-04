import React, { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { useToggle } from './hooks'
import AppContext from './pages/root-page/Context'
function App () {
    const [isOpen, setIsOpen, toggleOpen] = useToggle(false)      // if the nav button is a burger button
    const values = useMemo(
        () => ({ isOpen, setIsOpen, toggleOpen }),
        [isOpen, setIsOpen, toggleOpen]
    )
    
    return (
        <AppContext.Provider  value={values}>
            <Outlet />
        </AppContext.Provider>
    )
    
}

export default App
