// import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// import orderService from "./orderService";

// export const getOrders = createAsyncThunk("order/get-orders",async (thunkAPI) => {     //this getOrders is used below addCases not the getOrders in return statement below
//     try {
//         return await orderService.getOrders();     //the getProducts is same as the .addCase(getProducts.fulfilled, (state, action) => { in the customerSlice.js
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error);
//     }
// }
// );

// export const getAOrder = createAsyncThunk("order/get-order",async (id,thunkAPI) => {     //this getAOrder is used below addCases not the getOrder in return statement below
//     try {
//         return await orderService.getOrder(id);
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error);
//     }
// }
// );
// export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
// const initialState = {
//     orders: [],
//     isError: false,
//     isLoading: false,
//     isSuccess: false,
//     message: "",
// };
// export const productSlice = createSlice({
//     name: "orders",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(getOrders.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(getOrders.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.isError = false;
//             state.isSuccess = true;
//             state.orders = action.payload;
//         })
//         .addCase(getOrders.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//             state.isSuccess = false;
//             state.message = action.error;
//         })
//         .addCase(getAOrder.pending, (state) => {
//             state.isLoading = true;
//         })
//         .addCase(getAOrder.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.isError = false;
//             state.isSuccess = true;
//             state.userOrder = action.payload;
//         })
//         .addCase(getAOrder.rejected, (state, action) => {
//             state.isLoading = false;
//             state.isError = true;
//             state.isSuccess = false;
//             state.message = action.error;
//         })
//         .addCase(resetState, () => initialState);    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.

//     },
// });
// export default productSlice.reducer;