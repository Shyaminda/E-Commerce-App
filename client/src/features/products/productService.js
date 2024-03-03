import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getProducts = async () =>{
    const response = await axios.get(`${base_url}product`);  //this url: http://localhost:3000/api/user/register is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const productService = {
    getProducts
};

export default productService;