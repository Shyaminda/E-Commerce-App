import { createSlice, createAsyncThunk,createAction } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;

const initialState = {
    user: getUserFromLocalStorage,
    orders: [],
    userOrder: {
        products: [],    //this not included in the tutorial. I added this.because without this code line an error occurs
    },
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
};

export const login = createAsyncThunk("auth/admin-login", async (user,thunkAPI) => {    //this login is used below addCases not the login in return statement below    //TODO:tutorial has "auth/login" instead of "auth/admin-login"
    try{
        return await authService.login(user);      //"user" same as the authService login function. not certain 100% 
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getOrders = createAsyncThunk("order/get-orders",async (thunkAPI) => {     //this getOrders is used below addCases not the getOrders in return statement below
    try {
        return await authService.getOrders();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const getAOrder = createAsyncThunk("order/get-order",async (id,thunkAPI) => {     //this getAOrder is used below addCases not the getOrder in return statement below
    try {
        return await authService.getOrder(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const resetLoginStatus = () => ({
    type: 'auth/resetLoginStatus',
});

export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
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
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userOrder = action.payload;
            })
            .addCase(getAOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => initialState);
    },
});

export default authSlice.reducer;


// createAsyncThunk is used to define an asynchronous action creator named login. 
//This action creator dispatches an asynchronous operation, which, in this case, is the login process.
//Inside the createAsyncThunk, the asynchronous function (user, thunkAPI) => { ... } is called 
//when the login action is dispatched. This function calls authService.login(user) to perform the actual login operation.

// In summary, the first code snippet provides the implementation for the login logic, 
//while the second code snippet integrates this logic into the Redux store using Redux 
//Toolkit's createAsyncThunk function, allowing for easier management of asynchronous actions and their state within a Redux application.