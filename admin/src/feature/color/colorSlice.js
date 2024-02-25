import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk("color/get-colors",async (thunkAPI) => {   //this getColors is used below addCases not the getColors in return statement below
    try {
        return await colorService.getColors();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const createColor = createAsyncThunk(      //this createColor is used below addCases not the createColor in return statement below
    "color/create-color",
    async (colorData, thunkAPI) => {
    try {
        return await colorService.createColor(colorData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
);

export const getAColor = createAsyncThunk("color/get-color",async (id,thunkAPI) => {    //this getAColor is used in builder cases below not the getColor in return statement below
    try {
        return await colorService.getColor(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const updateAColor = createAsyncThunk("color/update-color",async (color,thunkAPI) => {    //this updateAColor is used in builder cases below not the updateColor in return statement below
    try {
        return await colorService.updateColor(color);   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const deleteAColor = createAsyncThunk("color/delete-color",async (id,thunkAPI) => {    //this deleteAColor is used in builder cases below not the deleteColor in return statement below
    try {
        return await colorService.deleteColor(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
const initialState = {
    colors: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const colorSlice = createSlice({
    name: "colors",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getColors.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getColors.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colors = action.payload;        //"colors" is same as the "colors" in the initialState name
        })
        .addCase(getColors.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createColor.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdColor = action.payload;              //used in AddColor.jsx
        })
        .addCase(createColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAColor.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.colorName = action.payload.name;   //used in AddColor.jsx //"name" is colorModel field
        })
        .addCase(getAColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateAColor.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateAColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedColor = action.payload;   //used in AddColor.jsx
        })
        .addCase(updateAColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteAColor.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteAColor.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedColor = action.payload;   //used in AddColor.jsx
        })
        .addCase(deleteAColor.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    },
});
export default colorSlice.reducer;