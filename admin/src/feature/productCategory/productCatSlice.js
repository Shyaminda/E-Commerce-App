import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productCatService from "./productCatService";

export const getProductCategories = createAsyncThunk("productCategory/get-productCat",async (thunkAPI) => {
    try {
        return await productCatService.getProductCategories();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const createProductCategory = createAsyncThunk(
    "brand/create-productCat",
    async (categoryData, thunkAPI) => {
    try {
        return await productCatService.createProductCategory(categoryData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
);

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
        });
    },
});
export default productCatSlice.reducer;