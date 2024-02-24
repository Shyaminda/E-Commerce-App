import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productCatService from "./productCatService";

export const getProductCategories = createAsyncThunk("productCategory/get-productCats",async (thunkAPI) => {   //this getProductCategories is used below addCases not the getProductCategories in return statement below
    try {
        return await productCatService.getProductCategories();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const createProductCategory = createAsyncThunk(   //this createProductCategory is used below addCases not the createProductCategory in return statement below
    "brand/create-productCat",
    async (categoryData, thunkAPI) => {
    try {
        return await productCatService.createProductCategory(categoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
);

export const getAProductCategory = createAsyncThunk("productCategory/get-productCat",async (id,thunkAPI) => {    //this getAProductCategory is used in builder cases below not the getAProductCategory in return statement below
    try {
        return await productCatService.getAProductCategory(id);   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const updateProductCategory = createAsyncThunk("productCategory/update-productCat",async (category,thunkAPI) => {    //this updateProductCategory is used in builder cases below not the updateProductCategory in return statement below
    try {
        return await productCatService.updateProductCategory(category);   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const deleteAProductCategory = createAsyncThunk("productCategory/delete-productCat",async (id,thunkAPI) => {    //this deleteAProductCategory is used in builder cases below not the deleteAProductCategory in return statement below
    try {
        return await productCatService.deleteAProductCategory(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
const initialState = {
    productCat: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const productCatSlice = createSlice({
    name: "productCat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProductCategories.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProductCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.productCat = action.payload;        //"productCat" is same as the "productCat" in the initialState name
        })
        .addCase(getProductCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdProductCat = action.payload;        //used in AddCategory.jsx
        })
        .addCase(createProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedProductCat = action.payload;        //used in AddCategory.jsx
        })
        .addCase(updateProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.productCategoryName = action.payload.title;        //used in AddCategory.jsx
        })
        .addCase(getAProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteAProductCategory.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAProductCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedProductCat = action.payload;        //used in AddCategory.jsx
        })
        .addCase(deleteAProductCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    },
});
export default productCatSlice.reducer;