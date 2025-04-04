import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { toast } from "react-toastify";

export const getProducts = createAsyncThunk("product/get-products", async (productData,thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
    try{
        return await productService.getProducts(productData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProduct = createAsyncThunk("product/get-product", async (id,thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
    try{
        return await productService.getProduct(id);
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

export const addRating = createAsyncThunk("product/ratings", async (productData,thunkAPI) => {    //this getAllProducts is used below addCases not the getProducts in return statement below 
    try{
        return await productService.rateProduct(productData);
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

export const productSlice = createSlice({
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
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.singleProduct = action.payload;
            })
            .addCase(getAProduct.rejected, (state, action) => {
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
            })
            .addCase(addRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addRating.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.isSuccess = true;
                state.rating = action.payload;
                if(state.isSuccess){
                    toast.success("Rating added to successfully!")
                }
            })
            .addCase(addRating.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if(state.isSuccess === false){
                    toast.error("something went wrong!")
                }
            });
    }
});

export default productSlice.reducer;