import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    sortBy: "DEFAULT",
    sortLabel: "Features",
    sortOptions: [
        { value: "DEFAULT", label: "Features" },
        { value: "NAME_ASC", label: "Name (A-Z)" },
        { value: "NAME_DESC", label: "Name (Z-A)" },
        { value: "PRICE_ASC", label: "Price (Low to High)" },
        { value: "PRICE_DESC", label: "Price (High to Low)" },
    ],
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortMethod: (state, action) => {
            const selectedOption = state.sortOptions.find((option) => option.value === action.payload)
            state.sortBy = action.payload;
            state.sortLabel = selectedOption.label
        },
    },
})

export const { setSortMethod, sortedProducts } = sortSlice.actions
export default sortSlice.reducer
