/**
 * @Description RegisterForm Component
 * @author GYX xiao sb
 * @date 2023/4/10
 */

import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { useDispatch } from 'react-redux'
import { userRegister } from '../../api/client'

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    
    const handleRegister = async () => {
        try {
            dispatch(userRegister({ email, password, passwordConfirm }))
        }
        catch (e) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-12 pt-16 px-8">
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
                <InputStyles
                    type="password"
                    placeholder="confirm password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required={true}
                />
            </InputContainerStyles>
            <div className="w-full flex flex-col gap-6">
                <button onClick={handleRegister}
                        className="w-full p-2 uppercase border bg-cyan-500 hover:border-sky-700 hover:bg-sky-600 text-white "
                >
                    Register
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
    hover:shadow-inner border-2 border-slate-400 focus:cursor-text
`

/**
 * End of RegisterForm Component
 */
export default RegisterForm