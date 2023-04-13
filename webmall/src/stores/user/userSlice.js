import { createSlice } from "@reduxjs/toolkit"
import { userLogin, userLogout, userRegister } from '../../api/client'

const initialState = {
    isAuthenticated: false,
    status: "null",
    user: [],
    error: null,
}

const authSlice = createSlice({
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
        })
        builder.addCase(userRegister.rejected, (state, action) => {
            state.status = "register failed"
            state.error = action.error.message
        })
        
        /* Login */
        builder.addCase(userLogin.pending, (state) => {
            state.status = "loading"
        })
        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isAuthenticated = true
            state.status = "login succeeded"
            state.user = action.payload.data
            localStorage.setItem('user', JSON.stringify(state))
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
            state.user = null
            localStorage.removeItem('user')
        })
        builder.addCase(userLogout.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message
        })
    },
})

export default authSlice.reducer