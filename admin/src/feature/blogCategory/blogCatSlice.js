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

export const createBlogCategory = createAsyncThunk(    //This thunk is responsible for creating a new brand asynchronously. It calls the createBrand function from the brandService module, passing brandData as an argument.
    "blog/create-blogCategory",       //The route "blog/create-blogCategory" in the createAsyncThunk function represents the action type for creating a blog category. This action type is used to uniquely identify the purpose of the action within your Redux application.
    async (blogCatData, thunkAPI) => {
    try {
        return await blogCatService.createBlogCategory(blogCatData);
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
        })
        .addCase(createBlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBlogCat = action.payload;        //used in addBlogCat.js
        })
        .addCase(createBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
    },
});
export default blogCatSlice.reducer;