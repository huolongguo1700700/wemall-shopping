/**
 * @Description EmailValidation Component
 * @author GYX xiao sb
 * @date 2023/4/23
 */

import React from 'react'

const EmailValidation = ({ email, setEmail, isEmailEmpty, emailError, setEmailError, InputStyles }) => {
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setEmailError(!e.target.value.includes('@'))
    }
    return (
        <>
            <InputStyles
                type="text"
                placeholder="email"
                value={email}
                onChange={handleEmailChange}
                className={`${emailError || isEmailEmpty ? 'border-red-500' : 'border-slate-400'} focus:cursor-text`}
                required={true}
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