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
        console.log('Wishlist data received from backend:', response.data);
        return response.data;
    }
};

const authService = {
    register,
    login,
    getWishlist
};

export default authService;

//todo: issue with wishlist not showing up in the UI