import React from 'react';
import CustomInput from '../components/CustomInput';

const ForgotPassword = () => {
    return (
    <div className='py-5' style={{"background":"#ffd333","minHeight":"100vh"}}>
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
            <h5 className='text-center'>Forgot Password</h5>
            <p className='text-center small'>Please enter your email.</p>
                <form>
                    <CustomInput type="text" label="email" id="email" />
                    <button className='border-0 px-3 py-2 text-white fw-bold w-100' type='submit' style={{"background":"#ffd333"}}>Send Link</button>
                </form>
        </div>
    </div>
    );
}

export default ForgotPassword;