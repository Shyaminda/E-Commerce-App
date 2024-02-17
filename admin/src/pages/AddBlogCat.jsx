import React from 'react';
import CustomInput from '../components/CustomInput';

const AddBlogCat = () => {
    return (
    <div>
        <h3 className="mb-4">Add Blog category</h3>
        <div>
            <form>
                <CustomInput type="text" label="Enter Blog Category" />
                <button type="submit" className='btn btn-success border-0 rounded-3 my-4'>Add Blog Category</button>
            </form>
        </div>
    </div>
    )
}

export default AddBlogCat;