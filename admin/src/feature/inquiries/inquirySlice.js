import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import inquiryService from "./inquiryService";

export const getInquiries = createAsyncThunk("inquiry/get-inquiry",async (thunkAPI) => {   //this getInquiries is used below addCases not the getInquiries in return statement below
    try {
        return await inquiryService.getInquiries();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);
const initialState = {
    inquiries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const inquirySlice = createSlice({
    name: "inquiries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getInquiries.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getInquiries.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.inquiries = action.payload;        //"inquiries" is same as the "inquiries" in the initialState name
        })
        .addCase(getInquiries.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
    },
});
export default inquirySlice.reducer;