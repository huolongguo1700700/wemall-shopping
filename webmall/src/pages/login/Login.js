/**
 * @Description Login Component
 * @author GYX xiao sb
 * @date 2023/4/5
 */

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useScrollTop } from '../../hooks'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { selectUserIsLogin } from '../../stores/user/userSelectors'

const Login = () => {
    const [activeTab, setActiveTab] = useState('login')
    
    const isLogin = useSelector(selectUserIsLogin)
    
    const navigate = useNavigate()
    const location = useLocation()
    
    useScrollTop()
    
    useEffect(() => {
        if (isLogin) {
            const returnUrl = location.state?.returnUrl || '/profile'
            const timer = setTimeout(() => {
                navigate(returnUrl)
            }, 1000) // 1 second delay
            
            // Clean up timer when component unmounts or when isLogin changes
            return () => clearTimeout(timer)
        }
    }, [isLogin])
    
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
                
            </div>
        </div>
    )
}
/**
 * End of Login Component
 */
export default Login