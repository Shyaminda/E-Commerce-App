import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const SignIn = () => {
    return (
    <>
        <Meta title="signIn" />
        <BreadCrumbs title="signIn" />
        <Container class1="login-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center mb-3'>Sign In</h3>
                        <form className='d-flex flex-column gap-20'>
                            <CustomInput type="email" name='email' placeholder="Email" className='form-control' />
                            <CustomInput type="password" name='password' placeholder="Password" className='form-control mt-1' />
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