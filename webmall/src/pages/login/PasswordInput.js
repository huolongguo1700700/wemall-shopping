/**
 * @Description PasswordInput Component
 * @author GYX xiao sb
 * @date 2023/4/23
 */

import React, { Fragment } from 'react'

const PasswordInput = ({ isSingle, password, setPassword, isPwdEmpty, confirmPassword, setConfirmPassword, passwordError, setPasswordError, InputStyles }) => {
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (!isSingle) {
            setPasswordError(password !== confirmPassword)
        }
    }
    
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        setPasswordError(password !== e.target.value)
    }
    
    return (
        <Fragment>
            <div className="relative my-6">
                <InputStyles
                    className={`${isPwdEmpty || passwordError ? "border-red-500" : "border-slate-400"}`}
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {isPwdEmpty && (
                    <span className="absolute left-0 bottom-[-1.5rem] text-red-500 text-sm">
                            Passwords can't be empty.
                        </span>
                )}
            </div>
            {!isSingle && (
                <div className="relative">
                    <InputStyles
                        type="password"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={`${passwordError ? 'border-red-500' : 'border-slate-400'} focus:cursor-text mt-4`}
                    />
                    {passwordError && (
                        <span className="absolute left-0 bottom-[-1.5rem] text-red-500 text-sm">
                            Passwords do not match.
                        </span>
                    )}
                </div>
            )}
        </Fragment>
    )
}

export default PasswordInput