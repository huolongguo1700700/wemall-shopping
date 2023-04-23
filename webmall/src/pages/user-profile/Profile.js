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
import StyledMain from '../../assets/cart-profile-structure/StyledMain'
import StyledContainer from '../../assets/cart-profile-structure/StyledContainer'
import StyledContents from '../../assets/cart-profile-structure/StyledContents'
import Footer from '../root-page/footer/Footer'

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
        <StyledMain>
            <StyledContainer>
                <StyledContents>
                    <div className="min-h-[calc(80vh)]">
                        <Outlet />
                    </div>
                    <div className="w-full h-full flex justify-center items-center">
                        <button onClick={handleLogout}
                                className="w-full max-w-5xl flex justify-center items-center p-2 uppercase border bg-green-500 hover:border-green-700 hover:bg-green-600 text-white"
                        >
                            Logout
                        </button>
                    </div>
                </StyledContents>
                <Footer />
            </StyledContainer>
            
            
            
        </StyledMain>
    )
}
/**
 * End of Profile Component
 */
export default Profile