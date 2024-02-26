import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import inquiryService from "./inquiryService";

export const getInquiries = createAsyncThunk("inquiry/get-inquiries",async (thunkAPI) => {   //this getInquiries is used below addCases not the getInquiries in return statement below
    try {
        return await inquiryService.getInquiries();     //the getInquiries is same as the .addCase(getProducts.fulfilled, (state, action) => { in the inquirySlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const getAInquiry = createAsyncThunk("inquiry/get-inquiry",async (id,thunkAPI) => {    //this getAInquiry is used in builder cases below not the getInquiry in return statement below
    try {
        return await inquiryService.getInquiry(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const updateAInquiry = createAsyncThunk("inquiry/update-inquiry",async (inquiry,thunkAPI) => {    //this updateAInquiry is used in builder cases below not the updateInquiry in return statement below
    try {
        return await inquiryService.updateInquiry(inquiry);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const deleteAInquiry = createAsyncThunk("inquiry/delete-inquiry",async (id,thunkAPI) => {    //this deleteAColor is used in builder cases below not the deleteColor in return statement below
    try {
        return await inquiryService.deleteInquiry(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);
export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
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
        })
        .addCase(getAInquiry.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAInquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.inquiryName = action.payload.name;     //used in AddInquiry.jsx //"name" is inquiryModel field and all the other fields below are also the fields of the inquiryModel
            state.inquiryMobile = action.payload.mobile;
            state.inquiryEmail = action.payload.email;
            state.inquiryComment = action.payload.comment;
            state.inquiryStatus = action.payload.status;   
        })
        .addCase(getAInquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateAInquiry.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateAInquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedInquiry = action.payload;   //used in AddColor.jsx
        })
        .addCase(updateAInquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteAInquiry.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAInquiry.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedInquiry = action.payload;   //used in AddColor.jsx
        })
        .addCase(deleteAInquiry.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    },
});
export default inquirySlice.reducer;