import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBrand, resetState } from '../feature/brand/brandSlice';

let schema = Yup.object().shape({
    //the validation schema
        title: Yup.string().required("Brand name is Required"),     //brandModel name is title
    });

const AddBrand = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newBrand = useSelector((state) => state.brand);   //getting the state from brandSlice the whole brand state is taken here because we need to check the success and error of the brand
    const { isSuccess, isError, createdBrand } = newBrand;
    useEffect(() => {
        if (isSuccess && createdBrand) {
            toast.success("Brand Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdBrand]);


    const formik = useFormik({
        initialValues: {
        title: "",
        },
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
            dispatch(resetState());       //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
            navigate("/admin/brand-list");   //navigating to the products page after the product is added
        },1000);
        },
});
    return (
    <div>
        <h3 className="mb-4 title">Add Brand</h3>
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

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>Add Brand</button>
            </form>
        </div>
    </div>
    )
}

export default AddBrand;