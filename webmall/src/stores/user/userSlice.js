import { createSlice } from "@reduxjs/toolkit"
import { userLogin, userLogout, userRegister } from '../../api/client'
import store from '../index'

const initialState = {
    isAuthenticated: false,
    status: "null",
    user: [],
    error: null,
}

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /* Register */
        builder.addCase(userRegister.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.status = "register succeeded"
            store.dispatch(
                userLogin({
                    email: action.meta.arg.email,
                    password: action.meta.arg.password,
                })
            )
        })
        builder.addCase(userRegister.rejected, (state, action) => {
            state.status = "register failed"
            state.error = action.error.msg
        })
        
        /* Login */
        builder.addCase(userLogin.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            console.log(action.payload)
            if(action.payload.errNo===0) {
                state.isAuthenticated = true
                state.status = "login succeeded"
                state.user = action.payload.data
                localStorage.setItem('user', JSON.stringify(state))
            } else if(action.payload.errNo===1) {
                state.isAuthenticated = false
                state.status = "login failed"
                console.log(action.payload)
                state.error = action.payload.msg
                localStorage.setItem('user', JSON.stringify(state))
            }
        })
        builder.addCase(userLogin.rejected, (state, action) => {
            state.isAuthenticated = false
            state.status = "login failed"
            state.error = action.error.message
        })
        
        /* Logout */
        builder.addCase(userLogout.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(userLogout.fulfilled, (state) => {
            state.isAuthenticated = false
            state.status = "logout"
            state = initialState
            localStorage.setItem('user', JSON.stringify(state))
        })
        builder.addCase(userLogout.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    },
})

export default userSlice.reducer