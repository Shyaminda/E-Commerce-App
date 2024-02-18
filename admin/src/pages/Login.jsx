import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch,useSelector } from 'react-redux';
import { login,resetLoginStatus  } from '../feature/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let schema = Yup.object().shape({         //the validation schema
        email: Yup
            .string()
            .email("Email should be valid")
            .required("Email is Required"),
        password: Yup.string().required("Password is Required"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema:schema,

        onSubmit: values => {
            dispatch(login(values));   //dispatching the action
            //alert(JSON.stringify(values, null, 2));   //the alert is just for testing
        },
    });

    // const authState = useSelector(state => state.auth);
    // const { user, isError, isSuccess, isLoading, message } = authState.auth  || {};
    const { user, isError, isSuccess, isLoading, message } = useSelector(state => state.auth) || {};
    
    useEffect(() => {
        if (isSuccess) {
            navigate("/admin");
            // Reset login status when navigating away from the login page
            dispatch(resetLoginStatus());
        }
    }, [isSuccess, navigate, dispatch]);

    return (
    <div className='py-5' style={{"background":"#ffd333","minHeight":"100vh"}}>
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
            <h3 className='text-center title'>Login</h3>
            <p className='text-center'>Login to your account to continue.</p>
            <div className='error text-center'>
                {message && message.message === "Rejected" ? "Your not an admin" : ""}
            </div>
                <form onSubmit={formik.handleSubmit}>
                    <CustomInput 
                        type="text" 
                        name="email" 
                        val={formik.values.email} 
                        label="email" 
                        id="email" 
                        onCh={formik.handleChange("email")} 
                    />
                    <div className="error">
                        {formik.touched.email && formik.errors.email ? (
                        <div>{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <CustomInput 
                        type="password" 
                        name="password" 
                        val={formik.values.password}
                        label="password" 
                        id="pass" 
                        onCh={formik.handleChange("password")}
                    />
                    <div className="error">
                        {formik.touched.password && formik.errors.password ? (
                        <div>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <div className='mb-3 text-end'>
                        <Link to="forgot-password" className=''>Forgot Password?</Link>
                    </div>
                    <button  className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none' type='submit' style={{"background":"#ffd333"}}>Login</button>
                </form>
        </div>
    </div>
    );
}

export default Login;


//yup for validation

//useSelector: This is a React hook provided by React-Redux. It allows components to extract and subscribe to specific parts of the Redux store's state.
//state: This is the parameter passed to the callback function provided to useSelector. It represents the current state of the Redux store.
//state.auth: Assuming that auth is a slice of the Redux store (possibly created using Redux Toolkit's createSlice), this selects the portion of the state related to authentication.