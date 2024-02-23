import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBlogCategories = async () =>{
    const response = await axios.get(`${base_url}blog-category/`);  //this url: http://localhost:3000/api/user/blog-category is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createBlogCategory = async (blogCategory) => {        //The parameter "brand" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.post(`${base_url}blog-category/`, blogCategory, config);
    return response.data;
};

const blogCatService = {
    getBlogCategories,
    createBlogCategory
};

export default blogCatService;