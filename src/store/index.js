import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./slice/auth";
import companySlice from "./slice/company";

const store = configureStore({
    reducer: {
        auth: authSlice,
        company: companySlice,
    }
})
export default store