/**
 * @Description Login Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { userLogout } from '../../api/client'
import { useDispatch } from 'react-redux'

const Login = () => {
    const dispatch = useDispatch()
    
    const [activeTab, setActiveTab] = useState('login')
    
    const handleLogout = async () => await dispatch(userLogout())
    return (
        <div className="flex min-h-[calc(100vh-3rem)] min-w-[320px] w-full h-full justify-center items-center">
            <div className="relative w-80 h-[28rem] bg-white flex flex-col justify-center items-center">
                <div className="absolute top-6 w-full">
                    <button
                        className={`w-1/2 py-2 px-4 text-gray-500 border-b-2 ${
                            activeTab === 'login' ? 'border-blue-500 text-blue-500' : 'border-transparent'
                        }`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-2 px-4 text-gray-500 border-b-2 ${
                            activeTab === 'register' ? 'border-blue-500 text-blue-500' : 'border-transparent'
                        }`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </button>
                </div>
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                <button onClick={handleLogout}
                        className="w-2/3 p-2 uppercase border bg-green-500 hover:border-green-700 hover:bg-green-600 text-white "
                >
                    Logout
                </button>
            </div>
        </div>
    )
}
/**
 * End of Login Component
 */
export default Login