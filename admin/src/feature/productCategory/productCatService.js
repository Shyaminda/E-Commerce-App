import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProductCategories = async () =>{
    const response = await axios.get(`${base_url}product-category/`);  //this url: http://localhost:3000/api/user/product-category is the same url as the backend
    return response.data;      //this is the response from the backend
};

const productCatService = {
    getProductCategories,
};

export default productCatService;