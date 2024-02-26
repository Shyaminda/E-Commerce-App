import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getInquiries = async () =>{
    const response = await axios.get(`${base_url}inquiry/`);  //this url: http://localhost:3000/api/user/admin-login is the same url as the backend
    return response.data;      //this is the response from the backend
};

const getInquiry = async (id) => {   
    const response = await axios.get(`${base_url}inquiry/${id}`, config);
    return response.data;
};

const deleteInquiry = async (id) => {        
    const response = await axios.delete(`${base_url}inquiry/${id}`, config);
    return response.data;
};

const updateInquiry = async (inquiry) => {        //The parameter "inquiry" in the updateInquiry function represents the data or payload that you want to send as the request body
    const response = await axios.put(`${base_url}inquiry/${inquiry.id}`, {
        name: inquiry.inquiryData.name

    }, config);    //"inquiryData" is passed from AddInquiry.jsx where under the "onSubmit: (values) => {"    //the "values" passed from AddInquiry.jsx from formik "inquiryData: values" is passed to here so that the title can be extracted and updated
    return response.data;                                         //also above "name" is the name of the field in the model of the backend
};

const inquiryService = {
    getInquiries,
    getInquiry,
    deleteInquiry,
    updateInquiry,
};

export default inquiryService;