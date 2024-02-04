import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const SignUp = () => {
    return (
    <>
        <Meta title="Sign Up" />
        <BreadCrumbs title="Sign Up" />
        <Container class1="signIn-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center mb-3'>Sign Up</h3>
                        <form className='d-flex flex-column gap-20'>
                            <CustomInput type="text" name='name' placeholder="Name" className='form-control' />
                            <CustomInput type="text" name='lname' placeholder="Last Name" className='form-control' />
                            <CustomInput type="email" name='email' placeholder="Email" className='form-control' />
                            <CustomInput type="tel" name='Telephone' placeholder="Mobile" className='form-control' />
                            <CustomInput type="password" name='password' placeholder="Password" className='form-control mt-1' />
                            <div>
                                <div className='d-flex justify-content-center mt-3 gap-15 align-items-center'>
                                    <button type='submit' className='button signIn'>Sign Up</button>
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

export default SignUp;