import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import Meta from '../components/Meta';
import Container from '../components/Container';
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateProfile } from '../features/auth/authSlice';
import { TiEdit } from "react-icons/ti";

const profileSchema = yup.object({
    firstName: yup.string().required("first Name is required"),
    lastName: yup.string().required("last Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    mobile: yup.number().required("Mobile is required"),
});



const Profile = () => {
    const [edit, setEdit] = useState(true);
    
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.auth);
    const { isError, isSuccess, updatedProfile } = profile;

useEffect(() => {
    if (isSuccess && updatedProfile) {
        toast.success("Profile updated Successfully!");
    }
    if (isError) {
        toast.error("Something Went Wrong!");
    }
}, [isSuccess, isError, updatedProfile]);

    const userState = useSelector(state => state.auth.loggedUser);

    const formik = useFormik({
        enableReinitialize: true,    //this is done to show the data in the form field when the form is opened for the second time to edit
        initialValues: {
            firstName: userState?.firstName || "",
            lastName: userState?.lastName || "",
            email: userState?.email || "",
            mobile: userState?.mobile || "",
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values));
            dispatch(updateProfile(values));
            setEdit(true);
        },
    });

    return (
        <>
            <Meta title="My Profile" />
            <BreadCrumbs title="My Profile" />
            <Container class1="cart-wrapper home-wrapper-2 py-5">
                <div className="row">

                    <div className="col-12">
                        <div className="d-flex justify-content-between align-content-center">
                            <h4 className='my-3'>Update Profile</h4>
                            <TiEdit className='fs-3' onClick={()=>setEdit(false)} />
                        </div>
                    </div>

                    <div className="col-12">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">First Name</label>
                                <input 
                                    type="text"
                                    name='firstName'
                                    //placeholder='First Name' 
                                    className="form-control" 
                                    id="" 
                                    disabled={edit}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange('firstName')}
                                    onBlur={formik.handleBlur('firstName')}
                                />
                                <div className="error">
                                    {formik.touched.firstName && formik.errors.firstName}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Last Name</label>
                                <input 
                                    type="text" 
                                    name='lastName'
                                    //placeholder='Last Name' 
                                    className="form-control" 
                                    id="" 
                                    disabled={edit}
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange('lastName')}
                                    onBlur={formik.handleBlur('lastName')}
                                />
                                <div className="error">
                                    {formik.touched.lastName && formik.errors.lastName}
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Email address</label>
                                <input 
                                    type="email" 
                                    name='email'
                                    //placeholder='Email' 
                                    className="form-control" 
                                    id="" 
                                    disabled={edit}
                                    value={formik.values.email}
                                    onChange={formik.handleChange('email')}
                                    onBlur={formik.handleBlur('email')} 
                                />
                                <div className="error">
                                    {formik.touched.email && formik.errors.email}
                                </div>
                            </div>
                            
                            {/* <div class="mb-3">
                                <label htmlFor="" className="form-label">Password</label>
                                <input 
                                    type="password"
                                    name='password' 
                                    //placeholder='Password' 
                                    className="form-control" 
                                    id="" 
                                />
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="" className="form-label">Mobile No.</label>
                                <input 
                                    type="tel" 
                                    name='mobile'
                                    //placeholder='Password' 
                                    className="form-control" 
                                    id="" 
                                    disabled={edit}
                                    value={formik.values.mobile}
                                    onChange={formik.handleChange('mobile')}
                                    onBlur={formik.handleBlur('mobile')} 
                                />
                                <div className="error">
                                    {formik.touched.mobile && formik.errors.mobile}
                                </div>
                            </div>
                            {
                                edit === false && 
                                <button type="submit" className="btn btn-primary">Save</button>
                            }
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Profile;