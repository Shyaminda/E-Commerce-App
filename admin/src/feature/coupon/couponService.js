import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getCoupons = async () =>{
    const response = await axios.get(`${base_url}coupon/`, config);  //this url: http://localhost:3000/api/user/coupon is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createCoupon = async (coupon) => {        //The parameter "coupon" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.post(`${base_url}coupon/`, coupon, config);
    return response.data;
};

const updateCoupon = async (coupon) => {        //The parameter "coupon" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.put(`${base_url}coupon/${coupon.id}`, {
        name: coupon.couponData.name,
        discount: coupon.couponData.discount,
        expiryDate: coupon.couponData.expiry,
    }, config);    //"couponData" is passed from AddCoupon.jsx where under the "onSubmit: (values) => {"    //the "values" passed from AddCoupon.jsx from formik "couponData: values" is passed to here so that the title can be extracted and updated
    return response.data;                                         //also above "name" is the name of the field in the model of the backend
};

const getCoupon = async (id) => {   
    const response = await axios.get(`${base_url}coupon/${id}`, config);
    return response.data;
};

const deleteCoupon = async (id) => {        
    const response = await axios.delete(`${base_url}coupon/${id}`, config);
    return response.data;
};

const couponService = {
    getCoupons,
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon,
};

export default couponService;