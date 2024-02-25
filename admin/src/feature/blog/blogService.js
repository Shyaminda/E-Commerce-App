import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBlogs = async () =>{
    const response = await axios.get(`${base_url}blog/`);  //this url: http://localhost:3000/api/user/blog is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createBlog = async (blog) => {
    const response = await axios.post(`${base_url}blog/`, blog, config);
    return response.data;
};

const updateBlog = async (blog) => {        //The parameter "blog" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.put(`${base_url}blog/${blog.id}`, {title: blog.blogData.title}, config);    //"blogData" is passed from AddBlog.jsx where under the "onSubmit: (values) => {"    //the "values" passed from AddBlog.jsx from formik "blogData: values" is passed to here so that the title can be extracted and updated
    return response.data;                                         //also above "title" is the name of the field in the model of the backend
};

const getBlog = async (id) => {   
    const response = await axios.get(`${base_url}blog/${id}`, config);
    return response.data;
};

const deleteBlog = async (id) => {        
    const response = await axios.delete(`${base_url}blog/${id}`, config);
    return response.data;
};

const blogService = {
    getBlogs,
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
};

export default blogService;