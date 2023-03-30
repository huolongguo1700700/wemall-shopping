/**
 * @Description UseToggle Component
 * @author GYX xiao sb
 * @date 17.09.2022
 */

import { useCallback, useState } from 'react'

/*
 * This React custom hook is using for switch the previous state
 * with a "Boolean" type.
 **/

export const useToggle = (initState = false) => {
    const [state, setState] = useState(initState)
    
    // useCallback to ensure that this hook won't be re-rendered when upper components re-rendering
    const stateToggle = useCallback(()=>{
        setState(prevState => !prevState)
    }, [])
    
    return [state, setState, stateToggle]
}
/**
 * End of UseToggle Component
 */
