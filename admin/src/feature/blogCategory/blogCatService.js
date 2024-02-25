import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBlogCategories = async () =>{
    const response = await axios.get(`${base_url}blog-category/`);  //this url: http://localhost:3000/api/user/blog-category is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createBlogCategory = async (blogCategory) => {        //The parameter "blogCategory" in the createBlogCategory function represents the data or payload that you want to send as the request body
    const response = await axios.post(`${base_url}blog-category/`, blogCategory, config);
    return response.data;
};

const updateBlogCategory = async (blogCategory) => {        //The parameter "blogCategory" in the updateBlogCategory function represents the data or payload that you want to send as the request body
    const response = await axios.put(`${base_url}blog-category/${blogCategory.id}`, {title: blogCategory.blogCategoryData.title}, config);    //"colorData" is passed from AddColor.jsx where under the "onSubmit: (values) => {"    //the "values" passed from AddColor.jsx from formik "colorData: values" is passed to here so that the title can be extracted and updated
    return response.data;                                         //also above "name" is the name of the field in the model of the backend
};

const getBlogCategory = async (id) => {   
    const response = await axios.get(`${base_url}blog-category/${id}`, config);
    return response.data;
};

const deleteBlogCategory = async (id) => {        
    const response = await axios.delete(`${base_url}blog-category/${id}`, config);
    return response.data;
};

const blogCatService = {
    getBlogCategories,
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};

export default blogCatService;