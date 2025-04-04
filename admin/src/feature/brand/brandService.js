import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getBrands = async () =>{
    const response = await axios.get(`${base_url}brand/`);  //this url: http://localhost:3000/api/user/admin-login is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createBrand = async (brand) => {        //The parameter "brand" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.post(`${base_url}brand/`, brand, config);
    return response.data;
};

const updateBrand = async (brand) => {        //The parameter "brand" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.put(`${base_url}brand/${brand.id}`, {title: brand.brandData.title}, config);    //"brandData" is passed from AddBrand.jsx where under the "onSubmit: (values) => {"    //the "values" passed from AddBrand.jsx from formik "brandData: values" is passed to here so that the title can be extracted and updated
    return response.data;
};

const getBrand = async (id) => {   
    const response = await axios.get(`${base_url}brand/${id}`, config);
    return response.data;
};

const deleteBrand = async (id) => {        
    const response = await axios.delete(`${base_url}brand/${id}`, config);
    return response.data;
};

const brandService = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
};

export default brandService;