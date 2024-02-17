import React from 'react';
import CustomInput from '../components/CustomInput';

const AddColor = () => {
    return (
    <div>
        <h3 className="mb-4">Add Color</h3>
        <div>
            <form>
                <CustomInput type="Color" label="Enter Color" />
                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>Add Color</button>
            </form>
        </div>
    </div>
    )
}

export default AddColor;