import React from 'react';
import { Input } from 'antd';

const CustomInput = (props) => {
    const { type,label,i_id,i_class } = props;
    return (
        <div className="form-floating mb-3">
            <Input 
                type={type}
                className={`form-control ${i_class}`}
                id={i_id}
                placeholder={label}
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
}

export default CustomInput;