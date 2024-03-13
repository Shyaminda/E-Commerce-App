import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getProducts = async () =>{
    const response = await axios.get(`${base_url}product`);  //this url: http://localhost:3000/api/product is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const getProduct = async (id) =>{
    const response = await axios.get(`${base_url}product/${id}`);  //this url: http://localhost:3000/api/product is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const addToWishlist = async (productId) =>{
    const response = await axios.put(`${base_url}product/wishList`,productId,config);  //this url: http://localhost:3000/api/product/wishList is the same url as the backend    //here this "productId" should be same as the key used in the server side product.controller.js addToWishList function
    if(response.data){
        return response.data;
    }
};

const rateProduct = async (productData) =>{
    const response = await axios.put(`${base_url}product/ratings`,productData,config);  //this url: http://localhost:3000/api/product/wishList is the same url as the backend    //here this "productId" should be same as the key used in the server side product.controller.js addToWishList function
    if(response.data){
        return response.data;
    }
};

const productService = {
    getProducts,
    addToWishlist,
    getProduct,
    rateProduct
};

export default productService;