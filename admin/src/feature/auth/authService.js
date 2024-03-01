import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const login = async (userData) =>{
    const response = await axios.post(`${base_url}user/admin-login`, userData);  //this url: http://localhost:3000/api/user/admin-login is the same url as the backend
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));    //stores the user data in the browser's localStorage using localStorage.setItem. Finally, it returns response.data, which typically contains the data returned by the server in response to the POST request.
    }                                   //"user" is simply a string key used to identify and retrieve the stored user data from the localStorage.
    return response.data;
};

const getOrders = async () =>{
    const response = await axios.get(`${base_url}user/getallorders`,config);  //this url: http://localhost:3000/api/user/getAllOrders is the same url as the backend
    return response.data;      //this is the response from the backend
};

const getOrder = async (id) =>{
    const response = await axios.get(`${base_url}user/getOrderByUser/${id}`,config);  //this url: http://localhost:3000/api/user/getAllOrders is the same url as the backend  //The second argument is the data payload. In this case, it's an empty string "", indicating that no additional data is being sent in the request body.
    return response.data;      //this is the response from the backend
};

const authService = {
    login,
    getOrders,
    getOrder
};

export default authService;