import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getUserFromLocalStorage = localStorage.getItem("user")
? JSON.parse(localStorage.getItem("user"))
: null;

const config = {
    headers: {
        Authorization: `Bearer ${getUserFromLocalStorage.token}`,
        Accept: "application/json",
    },
};

const getOrders = async () =>{
    const response = await axios.get(`${base_url}user/getallorders`,config);  //this url: http://localhost:3000/api/user/getAllOrders is the same url as the backend
    return response.data;      //this is the response from the backend
};

const orderService = {
    getOrders,
};

export default orderService;