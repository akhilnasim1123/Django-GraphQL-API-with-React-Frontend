
import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Features/Authority.jsx'


export const store = configureStore({
    reducer:{
        authority:userSlice
    }
})