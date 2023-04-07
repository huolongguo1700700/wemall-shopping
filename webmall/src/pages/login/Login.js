/**
 * @Description Login Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React from 'react'
import LoginForm from './LoginForm'

const Login = () => {
    return (
        <div className="flex min-h-[calc(100vh-3rem)] min-w-[320px] w-full h-full justify-center items-center">
            <div className="w-80 h-[28rem] bg-white flex flex-col justify-center items-center">
                <LoginForm />
            </div>
        </div>
    )
}
/**
 * End of Login Component
 */
export default Login