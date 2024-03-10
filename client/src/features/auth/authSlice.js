    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import authService from "./authService";
    import { toast } from "react-toastify";

    export const register = createAsyncThunk("auth/register", async (userData,thunkAPI) => {    //this register is used below addCases not the register in return statement below 
        try{
            return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const login = createAsyncThunk("auth/login", async (userData,thunkAPI) => {    //this login is used below addCases not the login in return statement below 
        try{
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const addToCart = createAsyncThunk("auth/cart", async (cartData,thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.addTOCart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const getCart = createAsyncThunk("auth/cart/get", async (thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    const getCustomerFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")) 
    : null;


    const initialState = {
        user: getCustomerFromLocalStorage,
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
                .addCase(addToCart.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(addToCart.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.cart = action.payload;
                    if(state.isSuccess){
                        toast.success("Product added to cart")
                    }
                })
                .addCase(addToCart.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                })
                .addCase(getCart.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getCart.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.userCart = action.payload;
                })
                .addCase(getCart.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                })
        }
    });

    export default authSlice.reducer;