import axios from 'axios';

const register = async (userData) =>{
    const response = await axios.post("", userData);  //this url: http://localhost:3000/api/user/register is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const authService = {
    register
};

export default authService;