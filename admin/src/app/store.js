import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../feature/auth/authSlice.js";
import customerReducer from "../feature/customer/customerSlice.js";
import productReducer from "../feature/product/productSlice.js";
import brandReducer from "../feature/brand/brandSlice.js";
import productCatReducer from '../feature/productCategory/productCatSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        productCat: productCatReducer,
    },
});