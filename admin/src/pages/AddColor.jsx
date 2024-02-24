import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createColor } from "../feature/color/colorSlice";
import { resetState } from "../feature/brand/brandSlice";

let schema = Yup.object().shape({
    //the validation schema
        name: Yup.string().required("Color is Required"),     //colorModel name is name
    });

const AddColor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newColor = useSelector((state) => state.color);   //getting the state from brandSlice the whole brand state is taken here because we need to check the success and error of the brand
    const { isSuccess, isError, createdColor } = newColor;
    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success("Color Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdColor]);


    const formik = useFormik({
        initialValues: {
        name: "",
        },
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
            dispatch(resetState());       //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
            navigate("/admin/color-list");   //navigating to the products page after the product is added
        },1000);
        },
});
    return (
    <div>
        <h3 className="mb-4 title">Add Color</h3>
        <div>
            <form onSubmit={formik.handleSubmit}>
            <CustomInput 
                    id="color"
                    type="color" 
                    label="Enter Product Color" 
                    onCh={formik.handleChange("name")}
                    onBl={formik.handleBlur("name")}
                    val={formik.values.name}
                />
                <div className="error">
                    {formik.touched.name && formik.errors.name}
                </div>

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>Add Color</button>
            </form>
        </div>
    </div>
    )
}

export default AddColor;