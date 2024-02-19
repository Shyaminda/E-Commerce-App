import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getColors = async () =>{
    const response = await axios.get(`${base_url}color/`);  //this url: http://localhost:3000/api/user/admin-login is the same url as the backend
    return response.data;      //this is the response from the backend
};

const colorService = {
    getColors,
};

export default colorService;