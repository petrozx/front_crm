import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    companies : []
}

export const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCompany(state, action) {
            state.companies = action.payload
        }
    }
})

export const {setCompany} = companySlice.actions
export default companySlice.reducer