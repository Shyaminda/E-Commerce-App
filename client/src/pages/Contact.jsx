import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import { MdOutlineHome } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";
import Container from '../components/Container';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { createQuery } from '../features/contact/contactSlice';

let contactSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email Should be valid").required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    comment: Yup.string().required("Comment is required")//.min(10, "Comment should be at least 10 characters").max(100, "Comment should be at most 100 characters").trim(),
});

const Contact = () => {
    const dispatch = useDispatch();

    const formik = useFormik({
            initialValues: {
            name: "",
            email: "",
            mobile: "",
            comment: "",
            },
            validationSchema: contactSchema,

            onSubmit: values => {
                dispatch(createQuery(values));
            },
        });
    
    return (
    <>
        <Meta title="Contact Us" />
        <BreadCrumbs title="Contact Us" />
        <Container class1="contact-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15846.07519758786!2d80.04231435!3d6.82822225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2slk!4v1706946931004!5m2!1sen!2slk" 
                        title="Google Maps"
                        width="600" 
                        height="450" 
                        className='border-0 w-100' 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
                <div className='col-12 mt-5'>
                    <div className="contact-inner-wrapper d-flex justify-content-between">
                        <div>
                            <h3 className='contact-title mb-4'>Contact</h3>
                            <form className='d-flex flex-column gap-10' onSubmit={formik.handleSubmit}>
                                <div>
                                    <input 
                                        type="text" 
                                        placeholder="Name" 
                                        className='form-control mb-3' 
                                        name='name'      //this name field should be same as the inquiryModel field name
                                        onChange={formik.handleChange("name")}
                                        onBlur={formik.handleBlur("name")}
                                        value={formik.values.name}
                                    />
                                    <div className='error'>
                                        {
                                            formik.touched.name && formik.errors.name
                                        }
                                    </div>
                                </div>

                                <div>
                                    <input 
                                        type="email" 
                                        placeholder="Email" 
                                        className='form-control mb-3' 
                                        name='email'      //this name field should be same as the inquiryModel field name
                                        onChange={formik.handleChange("email")}
                                        onBlur={formik.handleBlur("email")}
                                        value={formik.values.email}
                                    />
                                    <div className='error'>
                                        {
                                            formik.touched.email && formik.errors.email
                                        }
                                    </div>
                                </div>

                                <div>
                                    <input 
                                        type="tel" 
                                        placeholder="Mobile Number" 
                                        className='form-control mb-3' 
                                        name='mobile'      //this name field should be same as the inquiryModel field name
                                        onChange={formik.handleChange("mobile")}
                                        onBlur={formik.handleBlur("mobile")}
                                        value={formik.values.mobile}
                                    />
                                    <div className='error'>
                                        {
                                            formik.touched.mobile && formik.errors.mobile
                                        }
                                    </div>
                                </div>

                                <div>
                                    <textarea 
                                        id='' 
                                        cols={30} 
                                        rows={5} 
                                        placeholder="Comments" 
                                        className='form-control mb-3 w-100' 
                                        name='comment'      //this name field should be same as the inquiryModel field name
                                        onChange={formik.handleChange("comment")}
                                        onBlur={formik.handleBlur("comment")}
                                        value={formik.values.comment}
                                    />
                                </div>
                                <div className='error'>
                                        {
                                            formik.touched.comment && formik.errors.comment
                                        }
                                    </div>

                                <div>
                                    <button className='button'>Submit</button>
                                </div>
                            </form>
                        </div>
                        <div>
                            <h3 className='contact-title'>Get in touch</h3>
                            <div>
                                <ul className='ps-0'>
                                    <li className='mb-3 d-flex gap-15 align-items-center'>
                                        <MdOutlineHome className='fs-5' />
                                        <address className='mb-0'>123, Main Street, Colombo 01</address>   {/* here if we don't use mb-0 icon and the text doesn't align properly */}
                                    </li>
                                    <li className='mb-3 d-flex gap-15 align-items-center'>
                                        <IoCall className='fs-5' />
                                        <a href="tel:+94123456789">+94 123 456 789</a>
                                    </li>
                                    <li className='mb-3 d-flex gap-15 align-items-center'>
                                        <IoIosMail className='fs-5' />
                                        <a href="mailto:chamika@gmail.com">chamika@gmail.com</a>
                                    </li>
                                    <li className='mb-3 d-flex gap-15 align-items-center'>
                                        <IoInformationCircle className='fs-5' />
                                        <p className='mb-0'>Monday - Friday 10AM - 10PM</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </>
    )
}

export default Contact