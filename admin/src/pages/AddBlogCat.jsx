import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBlogCategory, getBlogCategory, resetState, updateABlogCategory } from "../feature/blogCategory/blogCatSlice";

let schema = Yup.object().shape({
    //the validation schema
        title: Yup.string().required("Blog category is Required"),     //brandModel name is title
    });

const AddBlogCat = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getBlogCategoryId = location.pathname.split("/")[3];   //getting the id from the url   //for better understanding refer AddBrand.jsx  //the id is extracted from the url after you click the edit button in of the brand list where from there it is passed, the id of the brand

    const newBlogCategory = useSelector((state) => state.blogCat); //"blogCat" should be same as store.js  //getting the state from blogCatSlice the whole brand state is taken here because we need to check the success and error of the blogCat
    const { isSuccess, isError, createdBlogCat, blogCategoryName, updatedBlogCategory } = newBlogCategory;

    useEffect(() => {              //with this function the data is shown in the form field when the form is opened for the second time to edit the data
        if(getBlogCategoryId !== undefined) {     //from this function "blogCategoryName" is taken from the blogCatSlice.js which is pass below to "const formik = useFormik({"    =>    "title: blogCategoryName || ""," //which is shown in the input field of formik
            dispatch(getBlogCategory(getBlogCategoryId));
        } else {
            dispatch(resetState());   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        }
    },[getBlogCategoryId, dispatch]);

    useEffect(() => {
        if (isSuccess && createdBlogCat) {
            toast.success("Blog Category Added Successfully!");
        }
        if (isSuccess && updatedBlogCategory) {
            toast.success("Blog category Updated Successfully!");
            navigate("/admin/blog-category-list");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdBlogCat, updatedBlogCategory, navigate]);


    const formik = useFormik({
        enableReinitialize: true,    //this is done to show the data in the form field when the form is opened for the second time to edit
        initialValues: {
        title: blogCategoryName || "",
        },
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        if(getBlogCategoryId !== undefined){
            const data = {id: getBlogCategoryId, blogCategoryData: values};    //this blogCategoryData is passed to the updateBlogCategory as the parameter as below "data" action in the blogCatSlice.js then passed to blogCatService.js updateBlogCategory function
            dispatch(updateABlogCategory(data));    //the "data" is passed to the updateBlogCategory action in the blogCatSlice.js
            dispatch(resetState());   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.

        } else {
            dispatch(createBlogCategory(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());       //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
                //navigate("/admin/blog-category-list");   //navigating to the products page after the product is added
            },1000);
        }
        },
});
    return (
    <div>
        <h3 className="mb-4 title">{getBlogCategoryId !== undefined ? "Edit" : "Add"} Blog category</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
            <CustomInput 
                    id="blogCat"
                    type="text" 
                    label="Enter Blog Category" 
                    name="title"
                    onCh={formik.handleChange("title")}
                    onBl={formik.handleBlur("title")}
                    val={formik.values.title}
                />
                <div className="error">
                    {formik.touched.title && formik.errors.title}
                </div>

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>{getBlogCategoryId !== undefined ? "Update" : "Add"} Blog Category</button>
            </form>
        </div>
    </div>
    )
}

export default AddBlogCat;