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
        },
        addCompany(state, action) {
            state.companies.push(action.payload)
        }
    }
})

export const {setCompany, addCompany} = companySlice.actions
export default companySlice.reducer
