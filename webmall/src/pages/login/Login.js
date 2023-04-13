/**
 * @Description Login Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

const Login = () => {
    const [activeTab, setActiveTab] = useState('login')
    
    return (
        <div className="flex min-h-[calc(100vh-3rem)] min-w-[320px] w-full h-full justify-center items-center">
            <div className="relative w-80 h-[28rem] bg-white flex flex-col justify-center items-center">
                <div className="absolute top-2">
                    <button
                        className={`py-2 px-4 text-gray-500 border-b-2 ${
                            activeTab === 'login' ? 'border-blue-500 text-blue-500' : 'border-transparent'
                        }`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`py-2 px-4 text-gray-500 border-b-2 ${
                            activeTab === 'register' ? 'border-blue-500 text-blue-500' : 'border-transparent'
                        }`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </button>
                </div>
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    )
}
/**
 * End of Login Component
 */
export default Login