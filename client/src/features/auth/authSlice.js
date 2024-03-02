import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const register = createAsyncThunk("auth/register", async (userData,thunkAPI) => {    //this register is used below addCases not the register in return statement below 
    try{
        return await authService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    user: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{
        resetLoginStatus: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
});

export default authSlice.reducer;