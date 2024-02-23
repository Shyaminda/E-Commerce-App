import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../feature/auth/authSlice.js";
import customerReducer from "../feature/customer/customerSlice.js";
import productReducer from "../feature/product/productSlice.js";
import brandReducer from "../feature/brand/brandSlice.js";
import productCatReducer from '../feature/productCategory/productCatSlice.js';
import colorReducer from '../feature/color/colorSlice.js';
import blogReducer from '../feature/blog/blogSlice.js';
import blogCatReducer from '../feature/blogCategory/blogCatSlice.js';
import inquiryReducer from '../feature/inquiries/inquirySlice.js';
import orderReducer from '../feature/order/orderSlice.js';
import uploadReducer from '../feature/upload/uploadSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        customer: customerReducer,
        product: productReducer,
        brand: brandReducer,
        productCat: productCatReducer,
        color: colorReducer,
        blog: blogReducer,
        blogCat: blogCatReducer,
        inquiry: inquiryReducer,
        order: orderReducer,
        upload: uploadReducer,
    },
});