import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCatService from "./blogCatService";

export const getBlogCategories = createAsyncThunk("blogCategory/get-blogCategories",async (thunkAPI) => {
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

export const getBlogCategory = createAsyncThunk("blog/get-blogCategory",async (id,thunkAPI) => {    //this getAColor is used in builder cases below not the getColor in return statement below
    try {
        return await blogCatService.getBlogCategory(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const updateABlogCategory = createAsyncThunk("blog/update-blogCategory",async (color,thunkAPI) => {    //this updateAColor is used in builder cases below not the updateColor in return statement below
    try {
        return await blogCatService.updateBlogCategory(color);   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const deleteABlogCategory = createAsyncThunk("blog/delete-blogCategory",async (id,thunkAPI) => {    //this deleteAColor is used in builder cases below not the deleteColor in return statement below
    try {
        return await blogCatService.deleteBlogCategory(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
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
            state.createdBlogCat = action.payload;        //used in AddBlogCat.jsx
        })
        .addCase(createBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getBlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogCategoryName = action.payload.title;   //used in AddBlogCat.jsx //"title" is blogCategoryModel field
        })
        .addCase(getBlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateABlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateABlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBlogCategory = action.payload;   //used in AddColor.jsx
        })
        .addCase(updateABlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteABlogCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteABlogCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBlogCategory = action.payload;   //used in AddColor.jsx
        })
        .addCase(deleteABlogCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    },
});
export default blogCatSlice.reducer;