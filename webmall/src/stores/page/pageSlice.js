// paginationSlice.js
import { createSlice } from '@reduxjs/toolkit'

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        itemsPerPage: 10,
        currentPage: 1
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        }
    }
})

export const { setCurrentPage } = pageSlice.actions

export default pageSlice.reducer