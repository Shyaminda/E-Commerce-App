import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
    <>
        <Meta title="signIn" />
        <BreadCrumbs title="signIn" />
        <div className="login-wrapper py-5 home-wrapper-2">
            <div className="row">
                <div className="col-12">
                    <div className="auth-card">
                        <h3 className='text-center mb-3'>Sign In</h3>
                        <form className='d-flex flex-column gap-20'>
                            <div>
                                <input type="email" name='email' placeholder="Email" className='form-control' />
                            </div>
                            <div>
                                <input type="password" name='password' placeholder="Password" className='form-control mt-1' />
                            </div>
                            <div>
                                <Link to="/forgot-password">Forgot Password?</Link>
                                <div className='d-flex justify-content-center mt-3 gap-15 align-items-center'>
                                    <button className='button signIn'>Sign In</button>
                                    <Link to="/sign-up" className='button signup'>Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default SignIn;