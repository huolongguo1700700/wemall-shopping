/**
 * @Description RegisterForm Component
 * @author GYX xiao sb
 * @date 2023/4/10
 */

import React, { useState } from 'react'
import tw from 'tailwind-styled-components'
import { useDispatch } from 'react-redux'
import { userRegister } from '../../api/client'
import EmailValidation from './EmailValidation'
import PasswordInput from './PasswordInput'

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [isEmailEmpty, setIsEmailEmpty] = useState(false)
    const [isPwdEmpty, setIsPwdEmpty] = useState(false)
    
    const handleRegister = async (event) => {
        event.preventDefault()
        const isEmailValid = !emailError
        const isPasswordValid = !passwordError
        setIsEmailEmpty(!email)
        setIsPwdEmpty(!password)
        const isFormValid = email && password && passwordConfirm && (isEmailValid || isEmailEmpty) && (isPasswordValid || isPwdEmpty)
        
        if (!isFormValid) {
            if (!passwordConfirm) setPasswordError(true)
            return
        }
        
        try {
            dispatch(userRegister({ email, password, passwordConfirm }))
        }
        catch (e) {
            console.error(e)
            throw new Error(e.message)
        }
    }
    
    return (
        <form className="w-full h-full flex flex-col justify-around items-center pt-16 gap-12 px-5"
              onSubmit={handleRegister}
        >
            <InputContainerStyles>
                <div className="relative my-3">
                    <EmailValidation
                        isSingle={false}
                        email={email}
                        setEmail={setEmail}
                        isEmailEmpty={isEmailEmpty}
                        emailError={emailError}
                        setEmailError={setEmailError}
                        InputStyles={InputStyles}
                    />
                </div>
                <PasswordInput
                    isSingle={false}
                    password={password}
                    setPassword={setPassword}
                    isPwdEmpty={isPwdEmpty}
                    confirmPassword={passwordConfirm}
                    setConfirmPassword={setPasswordConfirm}
                    passwordError={passwordError}
                    setPasswordError={setPasswordError}
                    InputStyles={InputStyles}
                />
            </InputContainerStyles>
            <div className="w-full flex flex-col gap-6">
                <button type="submit"
                        className="w-full p-2 uppercase border bg-cyan-500 hover:border-sky-700 hover:bg-sky-600 text-white "
                >
                    Register
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
    hover:shadow-inner border-2 border-slate-400 dark:border-slate-100 focus:cursor-text
    rounded
    dark:bg-green-900
`

/**
 * End of RegisterForm Component
 */
export default RegisterForm