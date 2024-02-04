import React from 'react';
import Meta from '../components/Meta';
import BreadCrumbs from '../components/BreadCrumbs';

const SignUp = () => {
    return (
    <>
        <Meta title="Sign Up" />
        <BreadCrumbs title="Sign Up" />
        <div className="signIn-wrapper py-5 home-wrapper-2">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h3 className='text-center mb-3'>Sign Up</h3>
                            <form className='d-flex flex-column gap-20'>
                                <div>
                                    <input type="text" name='name' placeholder="Name" className='form-control' />
                                </div>
                                <div>
                                    <input type="text" name='lname' placeholder="Last Name" className='form-control' />
                                </div>
                                <div>
                                    <input type="email" name='email' placeholder="Email" className='form-control' />
                                </div>
                                <div>
                                    <input type="tel" name='Telephone' placeholder="Mobile" className='form-control' />
                                </div>
                                <div>
                                    <input type="password" name='password' placeholder="Password" className='form-control mt-1' />
                                </div>
                                <div>
                                    <div className='d-flex justify-content-center mt-3 gap-15 align-items-center'>
                                        <button type='submit' className='button signIn'>Sign Up</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default SignUp;