import React, { useEffect } from "react";
import CustomInput from '../components/CustomInput';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createColor, getAColor, updateAColor } from "../feature/color/colorSlice";
import { resetState } from "../feature/color/colorSlice.js";

let schema = Yup.object().shape({
    //the validation schema
        name: Yup.string().required("Color is Required"),     //colorModel name is name
    });

const AddColor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getColorId = location.pathname.split("/")[3];   //getting the id from the url   //for better understanding refer AddBrand.jsx  //the id is extracted from the url after you click the edit button in of the color list where from there it is passed, the id of the color

    const newColor = useSelector((state) => state.color);   //getting the state from brandSlice the whole brand state is taken here because we need to check the success and error of the brand
    const { isSuccess, isError, createdColor, colorName, updatedColor } = newColor;

    useEffect(() => {              //with this function the data is shown in the form field when the form is opened for the second time to edit the data
        if(getColorId !== undefined) {     //from this function "colorName" is taken from the colorSlice.js which is pass below to "const formik = useFormik({"    =>    "title: colorName || ""," //which is shown in the input field of formik
            dispatch(getAColor(getColorId));
        } else {
            dispatch(resetState());   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        }
    },[getColorId, dispatch]);

    useEffect(() => {
        if (isSuccess && createdColor) {
            toast.success("Color Added Successfully!");
        }
        if (isSuccess && updatedColor) {
            toast.success("Color Updated Successfully!");
            navigate("/admin/color-list");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdColor, updatedColor, navigate]);


    const formik = useFormik({
        enableReinitialize: true,    //this is done to show the data in the form field when the form is opened for the second time to edit
        initialValues: {
        name: colorName || "",
        },
        validationSchema: schema,
    //*figure out why the already selected color is not shown in the form field when the form is opened for the second time to edit => just figured out the issue was with in ColorSlice getAColor payload, the correct ColorModel field name was not used
        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        if(getColorId !== undefined) {
            const data = {id: getColorId, colorData: values};    //this colorData is passed to the updateAColor as the parameter as below "data" action in the colorSlice.js then passed to colorService.js updateColor function
            dispatch(updateAColor(data));    //the "data" is passed to the updateColor action in the colorSlice.js
            dispatch(resetState());   //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
        } else {
            dispatch(createColor(values));
            formik.resetForm();
            setTimeout(() => {
                dispatch(resetState());       //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
                //navigate("/admin/color-list");   //navigating to the products page after the product is added
            },500);
        }
        },
});
    return (
    <div>
        <h3 className="mb-4 title">{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
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

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>{getColorId !== undefined ? "Update" : "Add"} Color</button>
            </form>
        </div>
    </div>
    )
}

export default AddColor;