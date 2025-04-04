import React from 'react';

const CustomInput = (props) => {
    const { type, name, placeholder, className, value, onChange, onBlur, disabled } = props;
    return (
    <div>
        <input 
            type={type} 
            className={`form-control ${className}`} 
            name={name} 
            placeholder={placeholder} 
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
        />
    </div>
    )
}

export default CustomInput;