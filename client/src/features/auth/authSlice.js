    import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
    import authService from "./authService";
    import { toast } from "react-toastify";

    export const register = createAsyncThunk("auth/register", async (userData,thunkAPI) => {    //this register is used below addCases not the register in return statement below 
        try{
            return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const login = createAsyncThunk("auth/login", async (userData,thunkAPI) => {    //this login is used below addCases not the login in return statement below 
        try{
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const getUserWishlist = createAsyncThunk("auth/wishlist", async (thunkAPI) => {    //this getUserWishlist is used below addCases not the getUserWishlist in return statement below 
        try{
            return await authService.getWishlist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const addToCart = createAsyncThunk("auth/cart", async (cartData,thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.addTOCart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const getCart = createAsyncThunk("auth/cart/get-product", async (thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const deleteCartProduct = createAsyncThunk("auth/cart/delete-product", async (data,thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.removeProductFromCart(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const updateCartProduct = createAsyncThunk("auth/cart/update-cart", async (cartItemId,quantity,thunkAPI) => {    //*here if quantity is not added then an error occur which is with  non-serializable value detected....  //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.updateProductFromCart(cartItemId,quantity);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const createOrder = createAsyncThunk("auth/cart/create-order", async (orderDetail,thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.createOrder(orderDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const getOrders = createAsyncThunk("auth/get-orders", async (thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.getOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const updateProfile = createAsyncThunk("auth/update-profile", async (data,thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.updateUser(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (userData,thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.forgotPassword(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    export const resetPassword = createAsyncThunk("auth/resetPassword", async (userData,thunkAPI) => {    //this addToCart is used below addCases not the addToCart in return statement below 
        try{
            return await authService.resetPassword(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    });

    const getCustomerFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;


    const initialState = {
        user: getCustomerFromLocalStorage,
        wishlist: [], //without this line, the wishlistState in Wishlist.jsx will be undefined
        isLoading: false,
        isError: false,
        isSuccess: false,
        message:"",
    };

    export const resetState = createAction("Reset_all");   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
    export const authSlice = createSlice({
        name: "auth",
        initialState: initialState,
        reducers:{},
        extraReducers: (builder) => {
            builder
                .addCase(register.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(register.fulfilled, (state, action) => {
                    //console.log('Register action fulfilled:', action.payload); 
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.createdUser = action.payload;
                })
                .addCase(register.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                    if(state.isError === true){
                        toast.error(action.payload.response.data.message);
                    }
                })
                .addCase(login.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(login.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.loggedUser = action.payload;
                    if(state.isSuccess === true){
                        localStorage.setItem("user", JSON.stringify(action.payload.firstName)); //* here the user firstName is saved because in this project react persist is not in use so when the page is refreshed the user data is lost except the token and the user which the keys where used in header.js component to show the name regardless of the page refresh but not shown when logged out
                        localStorage.setItem("token", action.payload.token); // if any thing changes in this line remove the token from the chrome application and login again because this token gets corrupted
                        toast.success("User Logged in Successfully!");
                    }
                })
                .addCase(login.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                    if(state.isError === true){
                        toast.error(action.payload.response.data.message);
                    }
                })
                .addCase(getUserWishlist.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getUserWishlist.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.wishlist  = action.payload;
                })
                .addCase(getUserWishlist.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error;
                })
                .addCase(addToCart.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(addToCart.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.cart = action.payload;
                    if(state.isSuccess){
                        toast.success("Product added to cart")
                    }
                })
                .addCase(addToCart.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                })
                .addCase(getCart.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getCart.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.userCart = action.payload;
                })
                .addCase(getCart.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                })
                .addCase(deleteCartProduct.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(deleteCartProduct.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.deletedCartProduct = action.payload;
                    if(state.isSuccess){
                        toast.success("Product removed from cart")
                    }
                })
                .addCase(deleteCartProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                    if(state.isSuccess === false){
                        toast.error("something went wrong!")
                    }
                })
                .addCase(updateCartProduct.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(updateCartProduct.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.updatedCartProduct = action.payload;
                    if(state.isSuccess){
                        toast.success("Product updated from cart successfully")
                    }
                })
                .addCase(updateCartProduct.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                    if(state.isSuccess === false){
                        toast.error("something went wrong!")
                    }
                })
                .addCase(createOrder.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(createOrder.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.orderedProducts = action.payload;
                    if(state.isSuccess){
                        toast.success("Order placed successfully")
                    }
                })
                .addCase(createOrder.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                    if(state.isSuccess === false){
                        toast.error("something went wrong!")
                    }
                })
                .addCase(getOrders.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(getOrders.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.userOrders = action.payload;
                })
                .addCase(getOrders.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                })
                .addCase(updateProfile.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(updateProfile.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.updatedProfile = action.payload;
                        // let currentUserData = JSON.parse(localStorage.getItem("user"));
                        // let updatedUserData = {
                        //     _id: currentUserData?._id,   //this is done to get the id of the user from the local storage already present data
                        //     token: currentUserData?.token,   //this is done to get the token of the user from the local storage already present data
                        //     firstName: action?.payload?.firstName,  //this is done to get the updated first name of the user
                        //     lastName: action?.payload?.lastName,  //this is done to get the updated last name of the user
                        //     email: action?.payload?.email,  //this is done to get the updated email of the user
                        //     mobile: action?.payload?.mobile,  //this is done to get the updated mobile of the user
                        // }
                        // localStorage.setItem("user",JSON.stringify(updatedUserData));
                        // state.user = updatedUserData;
                        toast.success("Profile updated successfully")
                        //** if update profile function doesn't work uncomment the above code snippet and check */
                })
                .addCase(updateProfile.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                })
                .addCase(forgotPassword.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(forgotPassword.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.password = action.payload;
                    if(state.isSuccess){
                        toast.success("Email sent successfully")
                    }
                })
                .addCase(forgotPassword.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                    if(state.isSuccess === false){
                        toast.error("something went wrong!")
                    }
                })
                .addCase(resetPassword.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(resetPassword.fulfilled, (state, action) => {
                    state.isError = false;
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.resetPassword = action.payload;
                    if(state.isSuccess){
                        toast.success("Password changed successfully")
                    }
                })
                .addCase(resetPassword.rejected, (state, action) => {
                    state.isLoading = false;
                    state.isError = true;
                    state.isSuccess = false;
                    state.message = action.error.message;
                    if(state.isSuccess === false){
                        toast.error("something went wrong!")
                    }
                })
                .addCase(resetState, () => initialState);   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        }
    });

    export default authSlice.reducer;

    //todo: add redux persist to store data 