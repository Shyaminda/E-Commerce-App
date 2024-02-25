import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProductCategory, getAProductCategory, updateProductCategory } from "../feature/productCategory/productCatSlice";
import { resetState } from "../feature/product/productSlice";

let schema = Yup.object().shape({
    //the validation schema
        title: Yup.string().required("Category name is Required"),     //productCategoryModel name is title
    });

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getProductCatId = location.pathname.split("/")[3];   //getting the id of the productCategory from the url for better understanding check AddBrand.jsx   //the id is extracted from the url after you click the edit button in of the product category list where from there it is passed, the id of the productCategory

    const newCategory = useSelector((state) => state.productCat);   //getting the state from productCatSlice the whole Category state is taken here because we need to check the success and error of the Category
    const { isSuccess, isError, createdProductCat, updatedProductCat, productCategoryName } = newCategory;

    useEffect(() => {             //with this function the data is shown in the form field when the form is opened for the second time to edit the data
        if(getProductCatId !== undefined) {       //from this function "productCategoryName" is taken from the productCatSlice.js which is pass below to "const formik = useFormik({"     =>     "title: productCategoryName || "","   //which is shown in the input field of formik
            dispatch(getAProductCategory(getProductCatId));
        } else {
            dispatch(resetState());    //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        }
    },[getProductCatId, dispatch]);

    useEffect(() => {
        if (isSuccess && createdProductCat) {
            toast.success("Category Added Successfully!");
        }
        if (isSuccess && updatedProductCat) {
            toast.success("Category Updated Successfully!");
            navigate("/admin/category-list");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdProductCat, updatedProductCat, dispatch, navigate]);


    const formik = useFormik({
        enableReinitialize: true,   //this is done to show the data in the form field when the form is opened for the second time to edit
        initialValues: {
        title: productCategoryName || "",
        },
        validationSchema: schema,

        onSubmit: (values) => {
            if(getProductCatId !== undefined){
                const data = {id: getProductCatId, categoryData: values};    //this categoryData is passed to the updateProductCategory as the parameter as below "data" action in the productCatSlice.js then passed to productCatService.js updateProductCategory function
                dispatch(updateProductCategory(data));   //the "data" is passed to the updateProductCategory action in the productCatSlice.js
                dispatch(resetState());  //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
            } else {
                dispatch(createProductCategory(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());       //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
                    //navigate("/admin/Category-list");   //navigating to the products page after the product is added
                },500);
            }
            // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        },
});
    return (
    <div>
        <h3 className="mb-4 title">{getProductCatId !== undefined ? "Edit" : "Add"} category</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput 
                    id="category"
                    type="text" 
                    label="Enter Product Category" 
                    name="Category"
                    onCh={formik.handleChange("title")}
                    onBl={formik.handleBlur("title")}    //the "title" is the name of the productCategoryModel
                    val={formik.values.title}
                />
                <div className="error">
                    {formik.touched.title && formik.errors.title}
                </div>

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>{getProductCatId !== undefined ? "Update" : "Add"} Category</button>
            </form>
        </div>
    </div>
    )
}

export default AddCategory;