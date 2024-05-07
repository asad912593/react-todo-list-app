import React from 'react';

const InputFields = ({ type, value, onChange, placeholder }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputFields;