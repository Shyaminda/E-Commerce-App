import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const getUserFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;

const initialState = {
    user: getUserFromLocalStorage,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
};

export const login = createAsyncThunk("auth/admin-login", async (user,thunkAPI) => {
    try{
        return await authService.login(user);      //"user" same as the authService login function. not certain 100% 
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetLoginStatus = () => ({
    type: 'auth/resetLoginStatus',
});

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