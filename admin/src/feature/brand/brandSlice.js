import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";

export const getBrands = createAsyncThunk("brand/get-brands",async (thunkAPI) => {    //this getBrands is used below addCases not the getBrands in return statement below
    try {
        return await brandService.getBrands();   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const getABrand = createAsyncThunk("brand/get-brand",async (id,thunkAPI) => {    //this getABrand is used in builder cases below not the getBrand in return statement below
    try {
        return await brandService.getBrand(id);   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const updateABrand = createAsyncThunk("brand/update-brand",async (brand,thunkAPI) => {    //this updateABrand is used in builder cases below not the updateBrand in return statement below
    try {
        return await brandService.updateBrand(brand);   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const createBrand = createAsyncThunk(     //this createBrand is used in builder cases below not the createBrand in return statement below   //This thunk is responsible for creating a new brand asynchronously. It calls the createBrand function from the brandService module, passing brandData as an argument.
    "brand/create-brand",
    async (brandData, thunkAPI) => {
    try {
        return await brandService.createBrand(brandData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
);

export const deleteABrand = createAsyncThunk("brand/delete-brand",async (id,thunkAPI) => {    //this deleteABrand is used in builder cases below not the deleteBrand in return statement below
    try {
        return await brandService.deleteBrand(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
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
            state.createdBrand = action.payload;   //used in AddBrand.jsx
        })
        .addCase(createBrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getABrand.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getABrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.brandName = action.payload.title;   //used in AddBrand.jsx   //"title" is brandModel field
        })
        .addCase(getABrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateABrand.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateABrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedBrand = action.payload;   //used in AddBrand.jsx
        })
        .addCase(updateABrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteABrand.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteABrand.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedBrand = action.payload;   //used in AddBrand.jsx
        })
        .addCase(deleteABrand.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    },
});
export default brandSlice.reducer;