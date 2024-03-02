import React, { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from '../features/auth/authSlice';

const signInSchema = yup.object({
    email: yup.string().email("Email is required").required("Email is required"),
    password: yup.string().required("Password is required"), //.min(6, "Password must be at least 6 characters"),
});

const SignIn = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth);
    const { isError, isSuccess, loggedUser } = user;

    useEffect(() => {
        if (isSuccess && loggedUser) {
            toast.success("User Logged in Successfully!");
            localStorage.setItem("token", loggedUser.token);
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, loggedUser]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
    validationSchema: signInSchema,

        onSubmit: (values) => {
            dispatch(login(values));
        },
    });

    return (
    <>
        <Meta title="signIn" />
        <BreadCrumbs title="signIn" />
        <Container class1="login-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center mb-3'>Sign In</h3>
                        <form className='d-flex flex-column gap-20' onSubmit={formik.handleSubmit}>
                            <CustomInput 
                                type="email" 
                                name='email' 
                                placeholder="Email" 
                                className='form-control' 
                                onChange={formik.handleChange("email")}
                                onBlur={formik.handleBlur("email")}
                                value={formik.values.email}
                            />
                            <div className='error'>
                                {formik.touched.email && formik.errors.email}
                            </div>

                            <CustomInput 
                                type="password" 
                                name='password' 
                                placeholder="Password" 
                                className='form-control mt-1' 
                                onChange={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                                value={formik.values.password}
                            />
                            <div className='error'>
                                {formik.touched.password && formik.errors.password}
                            </div>

                            <div>
                                <Link to="/forgot-password">Forgot Password?</Link>
                                <div className='d-flex justify-content-center mt-3 gap-15 align-items-center'>
                                    <button type='submit' className='button signIn'>Sign In</button>
                                    <Link to="/sign-up" className='button signup'>Sign Up</Link>
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

export default SignIn;