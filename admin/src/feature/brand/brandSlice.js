import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrands = createAsyncThunk("brand/get-brands",async (thunkAPI) => {
    try {
        return await brandService.getBrands();   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const createBrand = createAsyncThunk(    //This thunk is responsible for creating a new brand asynchronously. It calls the createBrand function from the brandService module, passing brandData as an argument.
    "brand/create-brand",
    async (brandData, thunkAPI) => {
    try {
        return await brandService.createBrand(brandData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
);

const initialState = {
    brands: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getBrands.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getBrands.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.brands = action.payload;
        })
        .addCase(getBrands.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createBrand.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createBrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdBrand = action.payload;
        })
        .addCase(createBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        });
    },
});
export default brandSlice.reducer;