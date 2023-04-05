import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sortBy: 'DEFAULT',
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortMethod: (state, action) => {
            /* Set sort method by input */
            state.sortBy = action.payload
        },
    },
})

export const { setSortMethod, sortedProducts } = sortSlice.actions
export default sortSlice.reducer
