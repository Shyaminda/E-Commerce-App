import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk("product/get-products", async (thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
    try{
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const addToWishlist = createAsyncThunk("product/wishlist", async (productId,thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
        try{
            return await productService.addToWishlist(productId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

const productState = {           //While "initialState" is a conventional name, you can use any name for your initial state object. In this case, "productState" might have been chosen to better reflect the purpose of the state slice, which appears to be related to product-related data management.
    product: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message:"",
};

export const blogSlice = createSlice({
    name: "product",
    initialState: productState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.product = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(addToWishlist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(addToWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    }
});

export default blogSlice.reducer;   

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import productService from "./productService";

// export const getAllProducts = createAsyncThunk("product/get-products", async (thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
//     try{
//         return await productService.getProducts();
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error);
//     }
// });

// export const addToWishlist = createAsyncThunk("product/wishList", async (productId,thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
//     try{
//         return await productService.addToWishlist(productId);
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error);
//     }
// });

// const productState = {           //While "initialState" is a conventional name, you can use any name for your initial state object. In this case, "productState" might have been chosen to better reflect the purpose of the state slice, which appears to be related to product-related data management.
//     product: "",
//     isLoading: false,
//     isError: false,
//     isSuccess: false,
//     message:"",
// };

// export const productSlice = createSlice({
//     name: "product",
//     initialState: productState,
//     reducers:{},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getAllProducts.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(getAllProducts.fulfilled, (state, action) => {
//                 state.isError = false;
//                 state.isLoading = false;
//                 state.isSuccess = true;
//                 state.product = action.payload;
//             })
//             .addCase(getAllProducts.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = true;
//                 state.isSuccess = false;
//                 state.message = action.error;
//             })
//             .addCase(addToWishlist.pending, (state) => {
//                 state.isLoading = true;
//             })
//             .addCase(addToWishlist.fulfilled, (state, action) => {
//                 state.isError = false;
//                 state.isLoading = false;
//                 state.isSuccess = true;
//                 state.wishlist = action.payload;
//             })
//             .addCase(addToWishlist.rejected, (state, action) => {
//                 state.isLoading = false;
//                 state.isError = true;
//                 state.isSuccess = false;
//                 state.message = action.error;
//             });
//     }
// });

// export default productSlice.reducer;   