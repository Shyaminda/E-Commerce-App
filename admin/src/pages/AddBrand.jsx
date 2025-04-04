import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrand, getABrand, resetState, updateABrand } from '../feature/brand/brandSlice';

let schema = Yup.object().shape({
    //the validation schema
        title: Yup.string().required("Brand name is Required"),     //brandModel name is title
    });

const AddBrand = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const getBrandId = location.pathname.split("/")[3];   //getting the id from the url  //the id is extracted from the url after you click the edit button in of the brand list where from there it is passed, the id of the color
    //console.log(getBrandId);   //the id is taken from the url //by useLocation we get a array and the url is split by "/" and the id is taken from the array [3] 
    //console.log data
        //     0
        // : 
        // ""
        // 1
        // : 
        // "admin"
        // 2
        // : 
        // "brand"
        // 3
        // : 
        // "65b0df528a1252daf913dd18"
        // length
        // : 
        // 4
    const newBrand = useSelector((state) => state.brand);   //getting the state from brandSlice the whole brand state is taken here because we need to check the success and error of the brand
    const { isSuccess, isError, createdBrand, brandName, updatedBrand } = newBrand;

    useEffect(() => {              //with this function the data is shown in the form field when the form is opened for the second time to edit the data
        if(getBrandId !== undefined) {     //from this function "brandName" is taken from the brandSlice.js which is pass below to "const formik = useFormik({"    =>    "title: brandName || ""," //which is shown in the input field of formik
            dispatch(getABrand(getBrandId));
        } else {
            dispatch(resetState());
        }
    },[getBrandId, dispatch]);

    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success("Brand Added Successfully!");
        }
        if (isSuccess && updatedBrand) {
            toast.success("Brand Updated Successfully!");
            navigate("/admin/brand-list");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdBrand, updatedBrand, dispatch, navigate]);


    const formik = useFormik({
        enableReinitialize: true,    //this is done to show the data in the form field when the form is opened for the second time to edit
        initialValues: {
        title: brandName || "", //you should provide a default value for brandName in case it's null. You can use optional chaining (?.) to safely access nested properties without throwing an error   
        },    //the value of the brandName is set to the formik values where the selected brand name is shown in the input field
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
            if(getBrandId !== undefined) {
                const data = {id: getBrandId, brandData: values};    //this brandData is passed to the updateBrand as the parameter as below "data" action in the brandSlice.js then passed to brandService.js updateBrand function
                dispatch(updateABrand(data));    //the "data" is passed to the updateBrand action in the brandSlice.js
                dispatch(resetState());   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
            } else {
                dispatch(createBrand(values));
                formik.resetForm();
                setTimeout(() => {
                    dispatch(resetState());       //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
                    //navigate("/admin/brand-list");   //navigating to the products page after the product is added
                },500);
            }
        },
    });
    return (
    <div>
        <h3 className="mb-4 title">{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput 
                    id="brand"
                    type="text" 
                    label="Enter Brand" 
                    name="title"
                    onCh={formik.handleChange("title")}
                    onBl={formik.handleBlur("title")}
                    val={formik.values.title}
                />
                <div className="error">
                    {formik.touched.title && formik.errors.title}
                </div>

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>{getBrandId !== undefined ? "Update" : "Add"} Brand</button>
            </form>
        </div>
    </div>
    )
}

export default AddBrand;