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
import { selectUserStatus } from '../../stores/user/userSelectors'

const Login = () => {
    const [activeTab, setActiveTab] = useState('login')
    
    const loginStatus = useSelector(selectUserStatus)
    
    const navigate = useNavigate()
    const location = useLocation()
    
    useScrollTop()
    
    useEffect(() => {
        if (loginStatus === "login succeeded") {
            const returnUrl = location.state?.returnUrl || '/profile'
            const timer = setTimeout(() => {
                navigate(returnUrl)
            }, 1000) // 1 second delay
            
            // Clean up timer when component unmounts or when isLogin changes
            return () => clearTimeout(timer)
        }
        else if(loginStatus === "login failed") {
        
        }
    }, [location.state?.returnUrl, loginStatus, navigate])
    
    return (
        <div className="flex min-h-[calc(100vh-3rem)] min-w-[320px] w-full h-full justify-center items-center">
            <div className="relative w-80 h-[28rem] bg-white dark:bg-green-800 flex flex-col justify-center items-center">
                <div className="absolute top-0 w-full">
                    <button
                        className={`w-1/2 py-4 px-4 text-gray-500 dark:text-lime-50 border-b-2  ${
                            activeTab === 'login' ? 'border-green-500 text-green-500' : 'border-transparent'
                        }`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-4 px-4 text-gray-500 dark:text-lime-50 border-b-2 ${
                            activeTab === 'register' ? 'border-green-500 text-green-500' : 'border-transparent'
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