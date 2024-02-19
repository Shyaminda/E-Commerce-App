import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getBrands = async () =>{
    const response = await axios.get(`${base_url}brand/`);  //this url: http://localhost:3000/api/user/admin-login is the same url as the backend
    return response.data;      //this is the response from the backend
};

const brandService = {
    getBrands,
};

export default brandService;