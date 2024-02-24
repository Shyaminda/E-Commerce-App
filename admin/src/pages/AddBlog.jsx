import React, { useEffect, useMemo } from "react";
import CustomInput from '../components/CustomInput';
import { Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from "../feature/upload/uploadSlice.js";
import { useSelector,useDispatch } from 'react-redux';
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBlog } from "../feature/blog/blogSlice.js";
import { getBlogCategories } from "../feature/blogCategory/blogCatSlice.js";
import { resetState } from "../feature/brand/brandSlice.js";

let schema = Yup.object().shape({
    //the validation schema
        title: Yup.string().required("Title is Required"),
        description: Yup.string().required("Description is Required"),
        category: Yup.string().required("Category is Required"),
});

const AddBlog = () => {
    const dispatch = useDispatch();   //dispatching the action 
    const navigate = useNavigate();   //for the navigation

    useEffect(() => {          //this is used to get all the brands to show in the select option dropdown   
        dispatch(getBlogCategories());   //dispatching from blogCatSlice
    }, [dispatch]);

    const imgState = useSelector((state) => state.upload.images);   //getting the state from uploadSlice
    const blogCategoryState = useSelector((state) => state.blogCat.blogCat);

    const blogState = useSelector((state) => state.blog);   
    const { isSuccess, isError, createdBlog } = blogState;
    useEffect(() => {
        if (isSuccess && createdBlog) {
            toast.success("Blog Added Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdBlog]);

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
        category: "",
        images: "",
        },
        validationSchema: schema,

        onSubmit: (values) => {
        // alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
            dispatch(resetState());       //this is done because the toastify message shows even after the relevant data is added and when again the same form is open the toastify message shows again. So, to avoid this.
            navigate("/admin/blog-list");   //navigating to the blogs page after the blog is added
        },1000);
        },
    });

useEffect(() => {
    formik.values.images = images;   //setting the images value to the formik values 
},[images,formik.values]);

    return (
    <div>
        <h3 className="mb-4 title">Add Blog</h3>
        <div className=''>
            <form onSubmit={formik.handleSubmit}>
                <div className='mt-4'>
                    <CustomInput 
                        type="text" 
                        label="Enter the Blog Title" 
                        name="title"
                        onCh={formik.handleChange("title")}
                        onBl={formik.handleBlur("title")}
                        val={formik.values.title}
                    />
                </div>
                <div className="error">
                    {formik.touched.title && formik.errors.title}
                </div>

                <Select 
                    name="category" 
                    className='form-control py-3 mb-3 mt-3' 
                    id=''
                    value={formik.values.category}
                    onChange={formik.handleChange("category")}
                    onBlur={formik.handleBlur("category")} 
                    defaultValue=""   
                >
                    <option value="">Select Blog Category</option>
                    {
                        blogCategoryState.map((i,j) => (
                        <option key={j} value={i.title}>{i.title}</option>    
                    ))
                    }
                </Select>
                <div className="error">
                    {formik.touched.category && formik.errors.category}
                </div>

                <ReactQuill 
                    theme="snow"
                    className="mt-3"
                    name="description"
                    onChange={formik.handleChange("description")}
                    onBlur={() => formik.handleBlur("description")}
                />
                <div className="error">
                    {formik.touched.description && formik.errors.description}
                </div>

                <div className="bg-white border-1 p-5 text-center mt-3">
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

                <div className="showImages d-flex flex-wrap gap-3 mt-3">
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

                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>Add Blog</button>
            </form>
        </div>
    </div>
    )
}

export default AddBlog