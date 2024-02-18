import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../feature/auth/authSlice.js";    

export const store = configureStore({
    reducer: {auth: authReducer },
});