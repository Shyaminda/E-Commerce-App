import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getCustomerFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer"))
: null;


export const register = createAsyncThunk("auth/register", async (userData,thunkAPI) => {    //this register is used below addCases not the register in return statement below 
    try{
        return await authService.register(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const login = createAsyncThunk("auth/login", async (userData,thunkAPI) => {    //this register is used below addCases not the register in return statement below 
    try{
        return await authService.login(userData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserWishlist = createAsyncThunk("auth/wishlist", async (thunkAPI) => {    //this getUserWishlist is used below addCases not the getUserWishlist in return statement below 
    try{
        return await authService.getWishlist();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const initialState = {
    user: getCustomerFromLocalStorage,
    wishlist: [],     //without this line, the wishlistState in Wishlist.jsx will be undefined
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{},
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
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.loggedUser = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserWishlist.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.wishlist  = action.payload;
            })
            .addCase(getUserWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
});

export default authSlice.reducer;