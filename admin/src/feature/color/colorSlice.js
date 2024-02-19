import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk("color/get-color",async (thunkAPI) => {
    try {
        return await colorService.getColors();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);
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
        });
    },
});
export default colorSlice.reducer;