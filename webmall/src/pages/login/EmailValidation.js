/**
 * @Description EmailValidation Component
 * @author GYX xiao sb
 * @date 2023/4/23
 */

import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserStatus } from '../../stores/user/userSelectors'

const EmailValidation = ({ isSingle, email, setEmail, isEmailEmpty, emailError, setEmailError, InputStyles }) => {
    const loginStatus = useSelector(selectUserStatus)
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setEmailError(!e.target.value.includes('@'))
    }
    return (
        <>
            {loginStatus==="login failed" ?
                <span className="absolute left-0 top-[-1.5rem] text-red-500 text-sm">Email or password incorrect.</span>
                :
                !isSingle && loginStatus==="register failed"  ?
                    <span className="absolute left-0 top-[-1.5rem] text-red-500 text-sm">Register failed, contact support.</span>
                    :
                !isSingle && loginStatus==="email registered" &&
                    <span className="absolute left-0 top-[-1.5rem] text-red-500 text-sm">Email already register.</span>
            }
            <InputStyles
                type="text"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
                className={`${emailError || isEmailEmpty ? 'border-red-500' : 'border-slate-400'} focus:cursor-text`}
            />
            {emailError ?
                <span className="absolute left-0 bottom-[-1.5rem] text-red-500 text-sm">Please enter a valid email address.</span>
                :isEmailEmpty &&
                <span className="absolute left-0 bottom-[-1.5rem] text-red-500 text-sm">Please enter email address.</span>
            }
        </>
    )
}

export default EmailValidation