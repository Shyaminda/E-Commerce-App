import React from 'react';
import CustomInput from '../components/CustomInput';

const ResetPassword = () => {
    return (
    <div className='py-5' style={{"background":"#ffd333","minHeight":"100vh"}}>
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
            <h5 className='text-center'>Reset Password</h5>
            <p className='text-center small'>Please confirm your password.</p>
                <form>
                    <CustomInput type="password" label="new password" id="pass" />
                    <CustomInput type="password" label="confirm password" id="confirmPass" />
                    <button className='border-0 px-3 py-2 text-white fw-bold w-100' type='submit' style={{"background":"#ffd333"}}>Reset Password</button>
                </form>
        </div>
    </div>
    );
}

export default ResetPassword;