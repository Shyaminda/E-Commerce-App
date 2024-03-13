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

const getCart = async () =>{
    const response = await axios.get(`${base_url}user/cart` ,config);  //this url: http://localhost:3000/api/user/register is the same url as the backend
    if(response.data){
        //console.log(response.data);
        return response.data;
    }
};

const removeProductFromCart = async (cartItemId) =>{
    const response = await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}` ,config);  //this url: http://localhost:3000/api/user/register is the same url as the backend   //the cartItemId is used because of the user.controller.js removeProductFromCart function
    if(response.data){
        return response.data;
    }
};

const updateProductFromCart = async (cartDetail) =>{
    const response = await axios.put(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}` ,config);  //this url: http://localhost:3000/api/user/register is the same url as the   //the cartItemId is used because of the user.controller.js updateProductFromCart function
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

const authService = {
    register,
    login,
    addTOCart,
    getCart,
    getWishlist,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getOrders
};

export default authService;


//todo: everything is working fine but the only problematic thing is the cart related stuff here cannot get the cart and also cannot add to the cart
//todo: issue with wishlist not showing up in the UI