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

const updateColor = async (color) => {        //The parameter "color" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.put(`${base_url}color/${color.id}`, {name: color.colorData.name}, config);    //"colorData" is passed from AddColor.jsx where under the "onSubmit: (values) => {"    //the "values" passed from AddColor.jsx from formik "colorData: values" is passed to here so that the title can be extracted and updated
    return response.data;                                         //also above "name" is the name of the field in the model of the backend
};

const getColor = async (id) => {   
    const response = await axios.get(`${base_url}color/${id}`, config);
    return response.data;
};

const deleteColor = async (id) => {        
    const response = await axios.delete(`${base_url}color/${id}`, config);
    return response.data;
};

const colorService = {
    getColors,
    createColor,
    getColor,
    updateColor,
    deleteColor,
};

export default colorService;