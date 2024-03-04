import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactService from "./contactService";
import { toast } from "react-toastify";

export const createQuery = createAsyncThunk("contact/post-inquiry", async (contactData,thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
    try{
        return await contactService.postQuery(contactData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const contactState = {           //While "initialState" is a conventional name, you can use any name for your initial state object. In this case, "productState" might have been chosen to better reflect the purpose of the state slice, which appears to be related to product-related data management.
    contact: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
};

export const contactSlice = createSlice({
    name: "contact",
    initialState: contactState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(createQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuery.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.createdQuery = action.payload;
                if(state.isSuccess === true){
                    toast.success("Inquiry sent successfully");
                }
            })
            .addCase(createQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isError === true){
                    toast.error("Something went wrong!");
                }
            });
    }
});

export default contactSlice.reducer;  