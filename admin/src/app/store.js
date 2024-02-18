import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../feature/auth/authSlice';    //TODO: tutorial: import authReducer from '../feature/auth/authSlice';

export const store = configureStore({
    reducer: {auth: authSlice},
});