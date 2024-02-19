import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBlogs = async () =>{
    const response = await axios.get(`${base_url}blog/`);  //this url: http://localhost:3000/api/user/blog is the same url as the backend
    return response.data;      //this is the response from the backend
};

const blogService = {
    getBlogs,
};

export default blogService;