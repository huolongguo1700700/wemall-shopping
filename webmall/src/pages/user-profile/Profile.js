/**
 * @Description Profile Component
 * @author GYX xiao sb
 * @date 2023/4/13
 */

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { selectUser, selectUserIsLogin } from '../../stores/user/userSelectors'
import { fetchUserOrders, userLogout } from '../../api/client'
import { useScrollTop } from '../../hooks'

const Profile = () => {
    useScrollTop()
    
    const dispatch = useDispatch()
    
    const isLogin = useSelector(selectUserIsLogin)
    const user = useSelector(selectUser)
    
    const navigate = useNavigate()
    
    const handleLogout = async () => await dispatch(userLogout())
    
    useEffect(() => {
        isLogin ?
            user.id && dispatch(fetchUserOrders(user.id))
            :
            navigate('/login')
    }, [isLogin, navigate, dispatch, user.id])
    
    return (
        <div className="min-h-[calc(100vh-5rem)] w-full">
            <div>
                <Outlet />
            </div>
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