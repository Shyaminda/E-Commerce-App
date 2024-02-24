import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosConfig';

const getProductCategories = async () =>{
    const response = await axios.get(`${base_url}product-category/`);  //this url: http://localhost:3000/api/user/product-category is the same url as the backend
    return response.data;      //this is the response from the backend
};

const createProductCategory = async (category) => {
    const response = await axios.post(`${base_url}product-category/`, category, config);
    return response.data;
};

const updateProductCategory = async (category) => {        //The parameter "category" in the createBrand function represents the data or payload that you want to send as the request body
    //console.log(category);   //how the the parameter "categoryData" is found
    const response = await axios.put(`${base_url}product-category/${category.id}`,{title: category.categoryData.title}, config);    //"categoryData" is passed from AddCategory.jsx where under the "onSubmit: (values) => {"  //the "values" passed from AddCategory.jsx from formik "categoryData: values" is passed to here so that the title can be extracted and updated
    return response.data;
};

const getAProductCategory = async (id) => {   
    const response = await axios.get(`${base_url}product-category/${id}`, config);
    return response.data;
};

const deleteAProductCategory = async (id) => {        
    const response = await axios.delete(`${base_url}product-category/${id}`, config);
    return response.data;
};

const productCatService = {
    getProductCategories,
    createProductCategory,
    getAProductCategory,
    deleteAProductCategory,
    updateProductCategory,
};

export default productCatService;