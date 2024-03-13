import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { resetPassword } from '../features/auth/authSlice';
import { useFormik } from "formik";
import * as yup from "yup";

const passwordSchema = yup.object({
    password: yup.string().required("Password is required"), //.min(6, "Password must be at least 6 characters"),
});

const ResetPassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const getToken = location.pathname.split('/')[2];
    //console.log(getToken);

    const formik = useFormik({
        initialValues: {
            password: "",
        },
    validationSchema: passwordSchema,

        onSubmit: (values) => {
            dispatch(resetPassword({token: getToken, password: values.password}));    //here the token is taken from the url and the password is taken from the form and passed
            navigate('/signIn');
        
        },
    });

    return (
    <>
        <Meta title="Reset Password" />
        <BreadCrumbs title="Reset Password" />
        <Container class1="signIn-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center mb-3'>Reset Password</h3>
                        <form className='d-flex flex-column gap-20' onSubmit={formik.handleSubmit}>
                            <CustomInput 
                                type="password" 
                                name='password' 
                                placeholder="Password" 
                                className='form-control' 
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                                value={formik.values.password}
                            />
                            <div className='error'>
                                {formik.touched.password && formik.errors.password}
                            </div>
                            {/* <CustomInput type="password" name='confirm password' placeholder="Confirm Password" className='form-control' /> */}
                            <div>
                                <div className='d-flex justify-content-center mt-3 gap-15 align-items-center'>
                                    <button type='submit' className='button signIn'>Change Password</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    </>
    )
}

export default ResetPassword;