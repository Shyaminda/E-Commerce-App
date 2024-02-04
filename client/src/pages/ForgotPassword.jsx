import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const ForgotPassword = () => {
    return (
    <>
        <Meta title="Forgot Password" />
        <BreadCrumbs title="Forgot Password" />
        <Container class1="login-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center mb-3'>Reset Your Password</h3>
                        <p className="text-center mt-2 mb-3">We Will Send You a Email To Reset Your Password</p>
                        <form className='d-flex flex-column gap-20'>
                            <CustomInput type="email" name='email' placeholder="Email" className='form-control' />
                            <div>
                                <div className='d-flex justify-content-center flex-column mt-3 gap-15 align-items-center'>
                                    <button className='button signIn' type='submit'>Submit</button>
                                    <Link to="/signIn">Cancel</Link>
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

export default ForgotPassword;