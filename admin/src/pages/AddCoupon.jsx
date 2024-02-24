import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCoupon, resetState } from '../feature/coupon/couponSlice.js';

let schema = Yup.object().shape({
    //the validation schema
        name: Yup.string().required("Coupon Name is Required"),     //couponModel name is name        
        discount: Yup.number().required("Discount Percentage is Required"),     //couponModel name is discount
        expiryDate: Yup.date().required("Expiry Date is Required"),     //couponModel name is expiryDate
    });

const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newCoupon = useSelector((state) => state.coupon);   //getting the state from brandSlice the whole brand state is taken here because we need to check the success and error of the brand
    const { isSuccess, isError, createdCoupon } = newCoupon;
    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Created Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdCoupon]);


    const formik = useFormik({
        initialValues: {
        name: "",
        discount: "",
        expiryDate: "",
        
        },
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
            dispatch(resetState());       //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
            //navigate("/admin/brand-list");   //navigating to the products page after the product is added
        },1000);
        },
    });
    return (
    <div>
        <h3 className="mb-4 title">Add Coupon</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
                <CustomInput 
                    id="name"
                    type="text" 
                    label="Enter Coupon Name" 
                    name="name"
                    onCh={formik.handleChange("name")}
                    onBl={formik.handleBlur("name")}
                    val={formik.values.name}
                />
                <div className="error">
                    {formik.touched.name && formik.errors.name}
                </div>

                <CustomInput 
                    id="discount"
                    type="number" 
                    label="Enter Discount" 
                    name="discount"
                    onCh={formik.handleChange("discount")}
                    onBl={formik.handleBlur("discount")}
                    val={formik.values.discount}
                />
                <div className="error">
                    {formik.touched.discount && formik.errors.discount}
                </div>

                <CustomInput 
                    id="date"
                    type="date" 
                    label="Enter Expiry Date" 
                    name="expiryDate"
                    onCh={formik.handleChange("expiryDate")}
                    onBl={formik.handleBlur("expiryDate")}
                    val={formik.values.expiryDate}
                />
                <div className="error">
                    {formik.touched.expiryDate && formik.errors.expiryDate}
                </div>

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>Add Coupon</button>
            </form>
        </div>
    </div>
    )
}

export default AddCoupon;