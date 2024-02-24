import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getCoupons = async () =>{
    const response = await axios.get(`${base_url}coupon/`, config);  //this url: http://localhost:3000/api/user/coupon is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createCoupon = async (coupon) => {        //The parameter "brand" in the createBrand function represents the data or payload that you want to send as the request body
    const response = await axios.post(`${base_url}coupon/`, coupon, config);
    return response.data;
};

const couponService = {
    getCoupons,
    createCoupon,
};

export default couponService;