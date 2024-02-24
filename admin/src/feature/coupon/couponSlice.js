import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getCoupons = createAsyncThunk("coupon/get-coupons",async (thunkAPI) => {
    try {
        return await couponService.getCoupons();   //getCoupons: This thunk is responsible for fetching coupon data asynchronously from the server. It calls the getCoupons function from the couponService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const createCoupon = createAsyncThunk(    //This thunk is responsible for creating a new coupon asynchronously. It calls the createCoupon function from the couponService module, passing couponData as an argument.
    "coupon/create-coupon",
    async (couponData, thunkAPI) => {
    try {
        return await couponService.createCoupon(couponData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
);

export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
const initialState = {
    coupons: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};
export const couponSlice = createSlice({
    name: "coupons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCoupons.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCoupons.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.coupons = action.payload;
        })
        .addCase(getCoupons.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(createCoupon.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCoupon = action.payload;   //used in AddCoupon.jsx
        })
        .addCase(createCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    },
});
export default couponSlice.reducer;