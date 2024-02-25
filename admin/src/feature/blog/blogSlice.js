import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlogs = createAsyncThunk("color/get-color",async (thunkAPI) => {   //this getBlogs is used below addCases
    try {
        return await blogService.getBlogs();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const createBlog = createAsyncThunk(      //this createBlog is used below addCases not the createBlog in return statement below
    "blog/create-blog",
    async (blogData, thunkAPI) => {
    try {
        return await blogService.createBlog(blogData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
);

export const getABlog = createAsyncThunk("blog/get-blog",async (id,thunkAPI) => {    //this getABlog is used in builder cases below not the getBlog in return statement below
    try {
        return await blogService.getBlog(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const updateABlog = createAsyncThunk("blog/update-blog",async (color,thunkAPI) => {    //this updateABlog is used in builder cases below not the updateBlog in return statement below
    try {
        return await blogService.updateBlog(color);   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const deleteABlog = createAsyncThunk("blog/delete-blog",async (id,thunkAPI) => {    //this deleteABlog is used in builder cases below not the deleteBlog in return statement below
    try {
        return await blogService.deleteBlog(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
const initialState = {
    blogs: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBlogs.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs = action.payload;        //"blogs" is same as the "blogs" in the initialState name
        })
        .addCase(getBlogs.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createBlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBlog = action.payload;    //used in AddBlog.jsx
        })
        .addCase(createBlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getABlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getABlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogName = action.payload.title;   //used in AddBlog.jsx //"title" is blogModel field
            state.blogCategory = action.payload.category;   //used in AddBlog.jsx
            state.blogDesc = action.payload.description;   //used in AddBlog.jsx
            state.blogImages = action.payload.images;   //used in AddBlog.jsx
        })
        .addCase(getABlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateABlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateABlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlog = action.payload;   //used in AddColor.jsx
        })
        .addCase(updateABlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteABlog.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteABlog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlog = action.payload;   //used in AddColor.jsx
        })
        .addCase(deleteABlog.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    },
});
export default blogSlice.reducer;