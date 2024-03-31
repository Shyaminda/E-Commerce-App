import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const register = async (userData) =>{
    const response = await axios.post(`${base_url}user/register`, userData);  //this url: http://localhost:3000/api/user/register is the same url as the backend
    if(response.data){
        if(response.data){
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    }
};

const login = async (userData) =>{
    const response = await axios.post(`${base_url}user/login`, userData);  //this url: http://localhost:3000/api/user/register is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const getWishlist = async () =>{
    const response = await axios.get(`${base_url}user/wishlist`, config);  //this url: http://localhost:3000/api/user/register is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const addTOCart = async (cartData) =>{
    //console.log("Cart Data:", cartData);
    const response = await axios.post(`${base_url}user/cart`, cartData ,config);  //this url: http://localhost:3000/api/user/register is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const getCart = async (data) =>{
    //console.log(data);   //the data is passing correctly
    
    const response = await axios.get(`${base_url}user/cart` ,config);  //this url: http://localhost:3000/api/user/cart is the same url as the backend  //the data here is the config2 which is passed from the Cart.jsx
    if(response.data){
        //console.log(response.data);
        return response.data;
    }
};

const removeProductFromCart = async (data) =>{
    const response = await axios.delete(`${base_url}user/delete-product-cart/${data.id}` ,data.config2);  //this url: http://localhost:3000/api/user/register is the same url as the backend   //the data is used because of the user.controller.js removeProductFromCart function
    if(response.data){
        return response.data;
    }
};

const updateProductFromCart = async (cartDetail) =>{
    console.log(cartDetail);   //the data is passing correctly
    const response = await axios.put(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}` ,cartDetail.config2);  //this url: http://localhost:3000/api/user/register is the same url as the   //the cartItemId is used because of the user.controller.js updateProductFromCart function
    if(response.data){
        return response.data;
    }
};

const createOrder = async (orderDetail) =>{
    const response = await axios.post(`${base_url}user/cart/create-order`,orderDetail,config);  //this url: http://localhost:3000/api/user/register is the same url as the   //the cartItemId is used because of the user.controller.js updateProductFromCart function
    if(response.data){
        return response.data;
    }
};

const getOrders = async () =>{
    const response = await axios.get(`${base_url}user/get-orders`,config);  //this url: http://localhost:3000/api/user/register is the same url as the   //the cartItemId is used because of the user.controller.js updateProductFromCart function
    if(response.data){
        return response.data;
    }
};

const updateUser = async (data) =>{
    console.log(data);   //the data is passing correctly
    const response = await axios.put(`${base_url}user/edit-user`,data.data,data.config);  //this url: http://localhost:3000/api/user/register is the same url as the   //the cartItemId is used because of the user.controller.js updateProductFromCart function
    if(response.data){
        return response.data;
    }
};

const forgotPassword = async (data) =>{
    const response = await axios.post(`${base_url}user/forgot-password-token`,data);  //this url: http://localhost:3000/api/user/register is the same url as the   //the cartItemId is used because of the user.controller.js updateProductFromCart function
    if(response.data){
        return response.data;
    }
};

const resetPassword = async (data) =>{
    const response = await axios.put(`${base_url}user/reset-password/${data.token}`,{password:data?.password},data);  //this url: http://localhost:3000/api/user/register is the same url as the   //the cartItemId is used because of the user.controller.js updateProductFromCart function
    if(response.data){
        return response.data;
    }
};

const authService = {
    register,
    login,
    addTOCart,
    getCart,
    getWishlist,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getOrders,
    updateUser,
    forgotPassword,
    resetPassword
};

export default authService;


//todo: everything is working fine but the only problematic thing is the cart related stuff here cannot get the cart and also cannot add to the cart
//todo: issue with wishlist not showing up in the UI