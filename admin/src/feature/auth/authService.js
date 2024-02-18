import axios from 'axios';
import { base_url } from '../../utils/base_url';

const login = async (userData) =>{
    const response = await axios.post(`${base_url}user/admin-login`, userData);  //this url: http://localhost:3000/api/user/admin-login is the same url as the backend
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));    //stores the user data in the browser's localStorage using localStorage.setItem. Finally, it returns response.data, which typically contains the data returned by the server in response to the POST request.
    }                                   //"user" is simply a string key used to identify and retrieve the stored user data from the localStorage.
    return response.data;
};

const authService = {
    login,
};

export default authService;