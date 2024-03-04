import axios from 'axios';
import { base_url } from '../../utils/base_url';

const postQuery = async (contactData) =>{
    const response = await axios.post(`${base_url}inquiry`,contactData);  //this url: http://localhost:3000/api/product is the same url as the backend
    if(response.data){
        return response.data;
    }
};

const contactService = {
    postQuery
    
};

export default contactService;