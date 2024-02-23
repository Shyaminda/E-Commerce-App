import React, { useEffect, useMemo, useState } from "react";
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
import Dropzone from 'react-dropzone'
import { deleteImg, uploadImg } from "../feature/upload/uploadSlice.js";
import { createProducts } from "../feature/product/productSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let schema = Yup.object().shape({
  //the validation schema
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    price: Yup.number().required("Price is Required"),
    brand: Yup.string().required("Brand is Required"),
    category: Yup.string().required("Category is Required"),
    tags: Yup.string().required("tags are Required"),
    color: Yup.array().min(1,"Select atleast one color").required("Color is Required"),      
    quantity: Yup.number().required("Quantity is Required"),    //all by considering the names
});

const AddProduct = () => {
    const [color, setColor] = useState([]);
    //const [img, setImg] = useState([]);   //for the images
    // console.log(color);
    const dispatch = useDispatch();   //dispatching the action 
    const navigate = useNavigate();   //for the navigation

    useEffect(() => {          //this is used to get all the brands to show in the select option dropdown   
        dispatch(getBrands());     //dispatching from brandSlice
        dispatch(getProductCategories());   //dispatching from productCatSlice
        dispatch(getColors());   //dispatching from colorSlice
    }, [dispatch]);

    const brandState = useSelector((state) => state.brand.brands);   //getting the state from brandSlice
    const productCatState = useSelector((state) => state.productCat.productCat);   //getting the state from productCatSlice
    const colorState = useSelector((state) => state.color.colors);   //getting the state from colorSlice
    const imgState = useSelector((state) => state.upload.images);   //getting the state from uploadSlice
    const newProduct = useSelector((state) => state.product.createdProduct);   //getting the state from productSlice 

    const { isSuccess, isError, createdProduct } = newProduct || {};
    useEffect(() => {
        if (isSuccess && createdProduct) {
            toast.success("Product Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdProduct]);

    const colorOpt = [];
    colorState.forEach((i) => {          //mapping the colors and pushing into the colors array
        colorOpt.push({                   //mapping the colors and pushing into the colors array
            label: i.name,       //The reason for using label and value instead of name and _id in the colorOpt array for the Select component is because the Select component from the Ant Design library expects objects with label and value properties to be passed as options.
            value: i._id,
        });
    }, []);

    // const images = [];     //the error:he 'images' array makes the dependencies of useEffect Hook (at line 98) change on every render. To fix this, wrap the initialization of 'images' in its own useMemo() Hook.
    // imgState.forEach((i) => {
    //     images.push({
    //         public_id: i.public_id,
    //         url: i.url,
    //     });
    // });
    const images = useMemo(() => {
        const updatedImages = imgState.map((i) => ({
            public_id: i.public_id,
            url: i.url,
        }));
        return updatedImages;
    }, [imgState]);
    
    //console.log(images);

    const formik = useFormik({
        initialValues: {
        title: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        tags: "",
        color: "",
        quantity: "",
        images: "",
        },
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        dispatch(createProducts(values));
        formik.resetForm();
        setColor(null);
        setTimeout(() => {
            navigate("/admin/product-list");   //navigating to the products page after the product is added
        },3000);
        },
});

useEffect(() => {
    formik.values.color = color ? color : "";   //setting the color value to the formik values   
    formik.values.images = images;   //setting the images value to the formik values 
},[color,images,formik.values]);

const handleColors = (e) => {
    setColor(e);
    //console.log(color)
}

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
                    value={formik.values.description}
                    name="description"
                    onChange={formik.handleChange("description")}
                    onBlur={() => formik.handleBlur("description")} // Ensure the onBlur event handler is properly defined  //The onBlur event is triggered when the ReactQuill component loses focus, but it seems there's an issue with the way it's being handled.
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

            <Select 
                name="tags"
                value={formik.values.tags}
                onChange={formik.handleChange("tags")}
                onBlur={formik.handleBlur("tags")} 
                defaultValue=""             //is used to set the default value of the select option dropdown as the category
                className="form-control py-3 mb-3" 
                id="">
                <option value="" disabled>Select Tag</option>
                <option value="featured">Featured</option>
                <option value="popular">Popular</option>
                <option value="special">Special</option>
            </Select>
            <div className="error">
                {formik.touched.tags && formik.errors.tags}
            </div>
            
            <Select
                mode="multiple"
                allowClear
                className="w-100"
                placeholder="Select Color"
                defaultValue={color}       //this is the useState taken 
                onChange={(i) => handleColors(i)}    //"i" is used because the color is an array 
                options={colorOpt}
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

            <div className="bg-white border-1 p-5 text-center">
                <Dropzone
                    onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                            Drag 'n' drop some files here, or click to select files
                            </p>
                        </div>
                        </section>
                    )}      
                </Dropzone>
            </div>     {/* dropzone => uploadSlice => uploadService => backend */}

            <div className="showImages d-flex flex-wrap gap-3">
                {
                    imgState.map((i,j) => {
                        return(
                            <div className="position-relative" key={j}>
                                <button type="button" className="btn-close position-absolute" style={{top:"5px",right: "5px"}} onClick={()=> dispatch(deleteImg(i.public_id))} >
                                </button>
                                <img src={i.url} alt="product" width={120} height={120} className=""/>   {/* "url" cloudinary */}
                            </div>
                        )
                    })
                }
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
