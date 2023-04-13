/**
 * @Description LoginForm Component
 * @author GYX xiao sb
 * @date 2023/4/7
 */

import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../api/client'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleLogin = async () => {
        try {
            await dispatch(userLogin({ email, password }))
        }
        catch (e) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    
    return (
        <div className="w-full h-full flex flex-col justify-center items-center pt-16 gap-12 px-8">
            <InputContainerStyles>
                <InputStyles
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                />
                <InputStyles
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />
            </InputContainerStyles>
            <div className="w-full flex flex-col gap-6">
                <button onClick={handleLogin}
                        className="w-full p-2 uppercase border bg-green-500 hover:border-green-700 hover:bg-green-600 text-white"
                >
                    Sign In
                </button>
            </div>
        </div>
    )
}

const InputContainerStyles = tw.div`
    w-full
    flex flex-col
    gap-12
`

const InputStyles = tw.input`
    w-full
    p-2
    uppercase-placeholder cursor-pointer
    text-middle
    hover:shadow-inner
    focus:cursor-text
    border-2 border-slate-400
`
/**
 * End of LoginForm Component
 */
export default LoginForm