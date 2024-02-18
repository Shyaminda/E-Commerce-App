import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../feature/auth/authSlice.js";
import customerReducer from "../feature/customer/customerSlice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer
    },
});