import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getCoupons = createAsyncThunk("coupon/get-coupons",async (thunkAPI) => {     //this getCoupons is used below addCases not the getCoupons in return statement below
    try {
        return await couponService.getCoupons();   //getCoupons: This thunk is responsible for fetching coupon data asynchronously from the server. It calls the getCoupons function from the couponService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const createCoupon = createAsyncThunk(     //this createCoupon is used below addCases not the createCoupon in return statement below   //This thunk is responsible for creating a new coupon asynchronously. It calls the createCoupon function from the couponService module, passing couponData as an argument.
    "coupon/create-coupon",
    async (couponData, thunkAPI) => {
    try {
        return await couponService.createCoupon(couponData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
    }
);

export const getACoupon = createAsyncThunk("coupon/get-coupon",async (id,thunkAPI) => {    //this getAColor is used in builder cases below not the getColor in return statement below
    try {
        return await couponService.getCoupon(id);   
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const updateACoupon = createAsyncThunk("coupon/update-coupon",async (color,thunkAPI) => {    //this updateAColor is used in builder cases below not the updateColor in return statement below
    try {
        return await couponService.updateCoupon(color);   //getBrands: This thunk is responsible for fetching brand data asynchronously from the server. It calls the getBrands function from the brandService module.  //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
);

export const deleteACoupon = createAsyncThunk("coupon/delete-coupon",async (id,thunkAPI) => {    //this deleteAColor is used in builder cases below not the deleteColor in return statement below
    try {
        return await couponService.deleteCoupon(id);   
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
        .addCase(getACoupon.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.couponName = action.payload.name;    //used in AddColor.jsx  //"name","discount","expiryDate" is couponModel field
            state.couponDiscount = action.payload.discount;  //in the tutorial [0] is used in front of every payload("action.payload[0].name","action.payload.discount[0]","action.payload[0].expiryDate") but in my case it is not used
            state.couponExpiry = action.payload.expiryDate;   
        })
        .addCase(getACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateACoupon.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCoupon = action.payload;   //used in AddColor.jsx
        })
        .addCase(updateACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteACoupon.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteACoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCoupon = action.payload;   //used in AddColor.jsx
        })
        .addCase(deleteACoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    },
});
export default couponSlice.reducer;