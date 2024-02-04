import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const ResetPassword = () => {
    return (
    <>
        <Meta title="Reset Password" />
        <BreadCrumbs title="Reset Password" />
        <Container class1="signIn-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center mb-3'>Reset Password</h3>
                        <form className='d-flex flex-column gap-20'>
                            <CustomInput type="password" name='password' placeholder="Password" className='form-control' />
                            <CustomInput type="password" name='confirm password' placeholder="Confirm Password" className='form-control' />
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