import React from 'react';
import { Input } from 'antd';

const CustomInput = (props) => {
<<<<<<< HEAD
    const { type,label,i_id,i_class,name,value,onChange,onBlur } = props;
=======
    const { type,label,i_id,i_class } = props;
>>>>>>> ad988b7bcb74db410a0ca1d147bb3a10dfe4d16c
    return (
        <div className="form-floating mb-3">
            <Input 
                type={type}
                className={`form-control ${i_class}`}
                id={i_id}
                placeholder={label}
<<<<<<< HEAD
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
=======
>>>>>>> ad988b7bcb74db410a0ca1d147bb3a10dfe4d16c
            />
            <label htmlFor={label}>{label}</label>
        </div>
    );
}

export default CustomInput;