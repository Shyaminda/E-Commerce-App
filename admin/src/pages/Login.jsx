import React from 'react';
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
    <div className='py-5' style={{"background":"#ffd333","minHeight":"100vh"}}>
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
            <h3 className='text-center title'>Login</h3>
            <p className='text-center'>Login to your account to continue.</p>
                <form>
<<<<<<< HEAD
                    <CustomInput type="text" name="email" value="" label="email" id="email" />
                    <CustomInput type="password" name="password" value="" label="password" id="pass" />
=======
                    <CustomInput type="text" label="email" id="email" />
                    <CustomInput type="password" label="password" id="pass" />
>>>>>>> ad988b7bcb74db410a0ca1d147bb3a10dfe4d16c
                    <div className='mb-3 text-end'>
                        <Link to="forgot-password" className=''>Forgot Password?</Link>
                    </div>
                    <Link to="/admin" className='border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none' type='submit' style={{"background":"#ffd333"}}>Login</Link>
                </form>
        </div>
    </div>
    );
}

export default Login;