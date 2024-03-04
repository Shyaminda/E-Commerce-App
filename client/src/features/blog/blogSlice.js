import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk("blog/get-blogs", async (thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
    try{
        return await blogService.getBlogs();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getABlog = createAsyncThunk("blog/get-blog", async (id,thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
    try{
        return await blogService.getBlog(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

const productState = {           //While "initialState" is a conventional name, you can use any name for your initial state object. In this case, "productState" might have been chosen to better reflect the purpose of the state slice, which appears to be related to product-related data management.
    blog: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
};

export const productSlice = createSlice({
    name: "blog",
    initialState: productState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogs.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.blog = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getABlog.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getABlog.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.TheBlog = action.payload;
            })
            .addCase(getABlog.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    }
});

export default productSlice.reducer;   