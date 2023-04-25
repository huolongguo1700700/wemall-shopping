/**
 * @Description LoginForm Component
 * @author GYX xiao sb
 * @date 2023/4/7
 */

import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { useDispatch } from 'react-redux'
import { userLogin } from '../../api/client'
import EmailValidation from './EmailValidation'
import PasswordInput from './PasswordInput'

const LoginForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [isEmailEmpty, setIsEmailEmpty] = useState(false)
    const [isPwdEmpty, setIsPwdEmpty] = useState(false)
    
    const handleLogin = async (event) => {
        event.preventDefault()
        
        const isEmailValid = !emailError
        const isPasswordValid = !passwordError
        setIsEmailEmpty(!email )
        setIsPwdEmpty(!password)
        const isFormValid = email && password && (isEmailValid || isEmailEmpty) && (isPasswordValid || isPwdEmpty)
        
        if (!isFormValid) return
        
        try {
            await dispatch(userLogin({ email, password }))
        }
        catch (e) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    
    return (
        <form onSubmit={handleLogin}
              className="w-full h-full flex flex-col justify-around items-center pt-16 gap-12 px-5"
        >
            <InputContainerStyles>
                <div className="relative my-3">
                    <EmailValidation
                        isSingle={true}
                        email={email}
                        setEmail={setEmail}
                        isEmailEmpty={isEmailEmpty}
                        emailError={emailError}
                        setEmailError={setEmailError}
                        InputStyles={InputStyles}
                    />
                </div>
                <div className="relative my-3">
                    <PasswordInput
                        isSingle={true}
                        password={password}
                        setPassword={setPassword}
                        passwordError={passwordError}
                        setPasswordError={setPasswordError}
                        isPwdEmpty={isPwdEmpty}
                        InputStyles={InputStyles}
                    />
                </div>
            </InputContainerStyles>
            <div className="w-full flex flex-col gap-6">
                <button type="submit"
                        className="w-full p-2 uppercase border bg-green-500 hover:border-green-700 hover:bg-green-600 text-white"
                >
                    Sign In
                </button>
            </div>
        </form>
    )
}

const InputContainerStyles = tw.div`
    w-full
    flex flex-col
    pt-12
`

const InputStyles = tw.input`
    w-full
    p-2
    uppercase-placeholder cursor-pointer
    text-middle
    hover:shadow-inner
    focus:cursor-text
    border-2 border-slate-400
    rounded
    dark:bg-green-900
`
/**
 * End of LoginForm Component
 */
export default LoginForm