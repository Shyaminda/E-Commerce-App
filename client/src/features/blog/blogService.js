import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBlogs = async () =>{
    const response = await axios.get(`${base_url}blog`);  //this url: http://localhost:3000/api/product is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const getBlog = async (id) =>{
    const response = await axios.get(`${base_url}blog/${id}`);  //this url: http://localhost:3000/api/product is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const blogService = {
    getBlogs,
    getBlog,
};

export default blogService;