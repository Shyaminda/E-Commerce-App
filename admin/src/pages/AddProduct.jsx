import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector,useDispatch } from 'react-redux';
import { Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getBrands } from "../feature/brand/brandSlice";
import { getProductCategories } from '../feature/productCategory/productCatSlice';
import { getColors } from "../feature/color/colorSlice.js";
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";

let schema = Yup.object().shape({
  //the validation schema
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    price: Yup.number().required("Price is Required"),
    brand: Yup.string().required("Brand is Required"),
    category: Yup.string().required("Category is Required"),
    color: Yup.array().required("Color is Required"),      
    quantity: Yup.number().required("Quantity is Required"),    //all by considering the names
});

const AddProduct = () => {
    const [color, setColor] = useState([]);
    // console.log(color);
    const dispatch = useDispatch();   //dispatching the action 

    useEffect(() => {          //this is used to get all the brands to show in the select option dropdown   
        dispatch(getBrands());     //dispatching from brandSlice
        dispatch(getProductCategories());   //dispatching from productCatSlice
        dispatch(getColors());   //dispatching from colorSlice
        formik.values.color = color;   //setting the color value to the formik values
    }, [dispatch]);

    const brandState = useSelector((state) => state.brand.brands);   //getting the state from brandSlice
    const productCatState = useSelector((state) => state.productCat.productCat);   //getting the state from productCatSlice
    const colorState = useSelector((state) => state.color.colors);   //getting the state from colorSlice

    const colors = [];
    colorState.forEach((i) => {          //mapping the colors and pushing into the colors array
        colors.push({                   //mapping the colors and pushing into the colors array
            _id: i._id, 
            color: i.name,
        });   
    });     

    const formik = useFormik({
        initialValues: {
        title: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        color: "",
        quantity: "",
        },
        validationSchema: schema,

        onSubmit: (values) => {
        //alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        },
});


return (
    <div>
        <h3 className="mb-4 title">Add Product</h3>
        <div>
            <form
            onSubmit={formik.handleSubmit}
            className="d-flex gap-3 flex-column"
            >
            <CustomInput
                type="text"
                label="Enter Product Title"
                name="title"
                onCh={formik.handleChange("title")}
                onBl={formik.handleBlur("title")}
                val={formik.values.title}
            />
            <div className="error">
                {formik.touched.title && formik.errors.title}
            </div>

            <div className="">
                <ReactQuill
                    theme="snow"
                    val={formik.values.description}
                    name="description"
                    onCh={formik.handleChange("description")}
                    onBl={formik.handleBlur("description")}
                />
            </div>
            <div className="error">
                {formik.touched.description && formik.errors.description}
            </div>

            <CustomInput 
                type="number" 
                label="Enter Product Price"
                val={formik.values.price}
                name="price"
                onCh={formik.handleChange("price")}
                onBl={formik.handleBlur("price")}
            />
            <div className="error">
                {formik.touched.price && formik.errors.price}
            </div>

            <Select 
                name="brand"
                value={formik.values.brand}
                onChange={formik.handleChange("brand")}
                onBlur={formik.handleBlur("brand")} 
                defaultValue=""    //is used to set the default value of the select option dropdown as the brand 
                className="form-control py-3 mb-3 " 
                id="">
                <option value="" disabled>Select Brand</option>
                {
                    brandState.map((i,j) => (
                        <option key={j} value={i.title}>{i.title}</option>    //mapping the brands that taken from brandState and showing in the select option dropdown
                    ))
                }
            </Select>
            <div className="error">
                {formik.touched.brand && formik.errors.brand}
            </div>

            <Select 
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")} 
                defaultValue=""             //is used to set the default value of the select option dropdown as the category
                className="form-control py-3 mb-3" 
                id="">
                <option value="" disabled>Select Category</option>
                {
                    productCatState.map((i,j) => (
                        <option key={j} value={i.title}>{i.title}</option>    //mapping the brands that taken from brandState and showing in the select option dropdown
                    ))
                }
            </Select>
            <div className="error">
                {formik.touched.category && formik.errors.category}
            </div>
            
            <Multiselect
                name="color"
                dataKey="id"
                textField="color"
                // defaultValue={["color"]}
                data={colors}
                onChange={(e) => setColor(e)}
            />
            <div className="error">
                {formik.touched.color && formik.errors.color}
            </div>
            
            {/* <Select name="" className="form-control py-3 mb-3" id="">
                <option value="">Select Color</option>
            </Select> */}

            <CustomInput 
                type="number" 
                label="Enter Product Quantity"
                name="quantity"
                onCh={formik.handleChange("quantity")}
                onBl={formik.handleBlur("quantity")}
                val={formik.values.quantity}
            />
            <div className="error">
                {formik.touched.quantity && formik.errors.quantity}
            </div>

            <button
                type="submit"
                className="btn btn-success border-0 rounded-3 my-4"
            >
                Add Product
            </button>
            </form>
        </div>
    </div>
);
};

export default AddProduct;
