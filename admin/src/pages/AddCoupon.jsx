import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCoupon, getACoupon, resetState, updateACoupon } from '../feature/coupon/couponSlice.js';

let schema = Yup.object().shape({
    //the validation schema
        name: Yup.string().required("Coupon Name is Required"),     //couponModel name is name        
        discount: Yup.number().required("Discount Percentage is Required"),     //couponModel name is discount
        expiryDate: Yup.date().required("Expiry Date is Required"),     //couponModel name is expiryDate
    });

const AddCoupon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getCouponId = location.pathname.split("/")[3];   //getting the id from the url   //for better understanding refer AddBrand.jsx  //the id is extracted from the url after you click the edit button in of the coupon list where from there it is passed, the id of the coupon

    const newCoupon = useSelector((state) => state.coupon);   //getting the state from brandSlice the whole brand state is taken here because we need to check the success and error of the brand
    const { isSuccess, isError, createdCoupon, couponName, updatedCoupon, couponDiscount, couponExpiry } = newCoupon;

    const changeDateFormat = (date) => {
        const newDate = new Date(date).toLocaleDateString();
        const [day, month, year] = newDate.split("/");
        return [year, month, day].join("-");
    };

    useEffect(() => {              //with this function the data is shown in the form field when the form is opened for the second time to edit the data
        if(getCouponId !== undefined) {     //from this function "couponName" is taken from the couponSlice.js which is pass below to "const formik = useFormik({"    =>    "title: couponName || ""," //which is shown in the input field of formik
            dispatch(getACoupon(getCouponId));
        } else {
            dispatch(resetState());   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        }
    },[getCouponId, dispatch]);

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Created Successfully!");
        }
        if (isSuccess && updatedCoupon) {
            toast.success("Coupon Updated Successfully!");
            navigate("/admin/coupon-list");
        }
        if (isError && couponName && couponDiscount && couponExpiry) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdCoupon, updatedCoupon, navigate, couponName, couponDiscount, couponExpiry]);


    const formik = useFormik({
        enableReinitialize: true,    //this is done to show the data in the form field when the form is opened for the second time to edit
        initialValues: {
            name: couponName || "",
            discount: couponDiscount || "",
            expiryDate: changeDateFormat(couponExpiry) || "",  //these same fields are used in the couponModel so these fields should be passed to updateCoupon function in the couponService.js
        },
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        if(getCouponId !== undefined){
            const data = {id: getCouponId, couponData: values};    //this couponData is passed to the updateACoupon as the parameter as below "data", action in the couponSlice.js then passed to couponService.js updateCoupon function
            dispatch(updateACoupon(data));    //the "data" is passed to the updateCoupon action in the couponSlice.js
            dispatch(resetState());   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        } else {
            dispatch(createCoupon(values));
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
        <h3 className="mb-4 title">{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
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

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>{getCouponId !== undefined ? "Update" : "Add"} Coupon</button>
            </form>
        </div>
    </div>
    )
}

export default AddCoupon;