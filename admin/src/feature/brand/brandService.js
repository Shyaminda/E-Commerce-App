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
    const response = await axios.put(`${base_url}brand/${brand.id}`, {title: brand.brandData.title}, config);    //todo: figure out from where the brandData is coming
    return response.data;
};

const getBrand = async (id) => {        //The parameter "brand" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.get(`${base_url}brand/${id}`, config);
    return response.data;
};

const brandService = {
    getBrands,
    createBrand,
    getBrand,
    updateBrand
};

export default brandService;