import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getProductCategories = async () =>{
    const response = await axios.get(`${base_url}product-category/`);  //this url: http://localhost:3000/api/user/product-category is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createProductCategory = async (category) => {
    const response = await axios.post(`${base_url}product-category/`, category, config);
    return response.data;
};

const productCatService = {
    getProductCategories,
    createProductCategory
};

export default productCatService;