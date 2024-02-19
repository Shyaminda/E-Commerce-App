import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCatService from "./blogCatService";

export const getBlogCategories = createAsyncThunk("blogCategory/get-blogCat",async (thunkAPI) => {
    try {
        return await blogCatService.getBlogCategories();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);
const initialState = {
    blogCat: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const blogCatSlice = createSlice({
    name: "blogCat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBlogCategories.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogCat = action.payload;        //"productCat" is same as the "productCat" in the initialState name
        })
        .addCase(getBlogCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
    },
});
export default blogCatSlice.reducer;