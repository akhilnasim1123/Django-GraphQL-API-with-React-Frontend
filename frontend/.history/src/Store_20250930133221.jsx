
import { configureStore } from "@reduxjs/toolkit";
import authSlice from './Features/Authority.jsx'


export const store = configureStore({
    reducer:{
        authority:userSlice
    }
})