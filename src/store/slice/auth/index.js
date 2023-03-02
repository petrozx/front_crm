import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    token: '',
    role: '',
    isAuth: false
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            if (action.payload) {
                state.token = action.payload
                state.isAuth = true
            } else {
                state.token = ''
                state.isAuth = false
            }
        },
        setRole(state, action) {
            state.role = action.payload
        }
    }
})

export const {login} = authSlice.actions;
export const {setRole} = authSlice.actions;
export default authSlice.reducer;