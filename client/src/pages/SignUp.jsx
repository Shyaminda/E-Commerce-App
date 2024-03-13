import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumbs from "../components/BreadCrumbs";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const signUpSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Email is required").required("Email is required"),
    mobile: yup.string().required("Mobile Number is required"),
    password: yup.string().required("Password is required"), //.min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newUser = useSelector((state) => state.auth);
    const { isError, isSuccess, createdUser } = newUser;

    useEffect(() => {
        if (isSuccess && createdUser) {
            toast.success("User Created Successfully!");
        }
        if (isError) {
            toast.error("Something Went Wrong!");
        }
    }, [isSuccess, isError, createdUser]);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            password: "",
        },
    validationSchema: signUpSchema,

        onSubmit: (values) => {
            dispatch(register(values));
            navigate("/signIn");
        },
    });

return (
    <>
        <Meta title="Sign Up" />
        <BreadCrumbs title="Sign Up" />
        <Container class1="signIn-wrapper py-5 home-wrapper-2">
            <div className="row">
            <div className="col-12">
                <div className="auth-card">
                <h3 className="text-center mb-3">Sign Up</h3>
                <form
                    className="d-flex flex-column gap-20"
                    onSubmit={formik.handleSubmit}
                >
                    <CustomInput
                        type="text"
                        name="name"
                        placeholder="First Name"
                        className="form-control"
                        value={formik.values.firstName}
                        onChange={formik.handleChange("firstName")}
                        onBlur={formik.handleBlur("firstName")}
                    />
                    <div className="error">
                        {
                            formik.touched.firstName && formik.errors.firstName
                        }
                    </div>

                    <CustomInput
                        type="text"
                        name="lname"
                        placeholder="Last Name"
                        className="form-control"
                        value={formik.values.lastName}
                        onChange={formik.handleChange("lastName")}
                        onBlur={formik.handleBlur("lastName")}
                    />
                    <div className="error">
                        {
                            formik.touched.lastName && formik.errors.lastName
                        }
                    </div>

                    <CustomInput
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                    />
                    <div className="error">
                        {
                            formik.touched.email && formik.errors.email
                        }
                    </div>

                    <CustomInput
                        type="tel"
                        name="mobile"
                        placeholder="Mobile"
                        className="form-control"
                        value={formik.values.mobile}
                        onChange={formik.handleChange("mobile")}
                        onBlur={formik.handleBlur("mobile")}
                    />
                    <div className="error">
                        {
                            formik.touched.mobile && formik.errors.mobile
                        }
                    </div>

                    <CustomInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mt-1"
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                    />
                    <div className="error">
                        {
                            formik.touched.password && formik.errors.password
                        }
                    </div>

                    <div>
                    <div className="d-flex justify-content-center mt-3 gap-15 align-items-center">
                        <button type="submit" className="button signIn">
                            Sign Up
                        </button>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </Container>
        </>
    );
};

export default SignUp;
