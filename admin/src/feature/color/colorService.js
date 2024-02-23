import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getColors = async () =>{
    const response = await axios.get(`${base_url}color/`);  //this url: http://localhost:3000/api/user/admin-login is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createColor = async (color) => {        //The parameter "color" in the createColor function represents the data or payload that you want to send as the request body
    const response = await axios.post(`${base_url}color/`, color, config);
    return response.data;
};

const colorService = {
    getColors,
    createColor
};

export default colorService;