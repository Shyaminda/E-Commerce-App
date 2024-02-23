import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProductCategory } from "../feature/productCategory/productCatSlice";

let schema = Yup.object().shape({
    //the validation schema
        title: Yup.string().required("Category name is Required"),     //productCategoryModel name is title
    });

const AddCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCategory = useSelector((state) => state.productCat);   //getting the state from productCatSlice the whole Category state is taken here because we need to check the success and error of the Category
    const { isSuccess, isError, createdProductCat } = newCategory;
    useEffect(() => {
        if (isSuccess && createdProductCat) {
            toast.success("Category Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdProductCat]);


    const formik = useFormik({
        initialValues: {
        title: "",
        },
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        dispatch(createProductCategory(values));
        formik.resetForm();
        setTimeout(() => {
            navigate("/admin/Category-list");   //navigating to the products page after the product is added
        },1000);
        },
});
    return (
    <div>
        <h3 className="mb-4 title">Add category</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput 
                    id="category"
                    type="text" 
                    label="Enter Product Category" 
                    name="Category"
                    onCh={formik.handleChange("title")}
                    onBl={formik.handleBlur("title")}
                    val={formik.values.title}
                />
                <div className="error">
                    {formik.touched.title && formik.errors.title}
                </div>

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>Add Category</button>
            </form>
        </div>
    </div>
    )
}

export default AddCategory;