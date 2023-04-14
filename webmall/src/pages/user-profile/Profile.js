/**
 * @Description Profile Component
 * @author GYX xiao sb
 * @date 2023/4/13
 */

import React, { useEffect } from 'react'
import { userLogout } from '../../api/client'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectUserIsLogin } from '../../stores/user/userSelectors'

const Profile = () => {
    const dispatch = useDispatch()
    const isLogin = useSelector(selectUserIsLogin)
    
    const navigate = useNavigate()
    
    const handleLogout = async () => await dispatch(userLogout())
    
    useEffect(() => {
        if(!isLogin) {
            navigate('/login')
        }
    }, [isLogin])
    
    
    
    return (
        <div className="h-[calc(100vh-5rem)] w-full">
            <button onClick={handleLogout}
                    className="w-36 p-2 uppercase border bg-green-500 hover:border-green-700 hover:bg-green-600 text-white "
            >
                Logout
            </button>
        </div>
    )
}
/**
 * End of Profile Component
 */
export default Profile