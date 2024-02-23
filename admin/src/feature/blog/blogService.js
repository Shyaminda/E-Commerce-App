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

const blogService = {
    getBlogs,
    createBlog,
};

export default blogService;