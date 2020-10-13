import React from 'react';

import './Input.scss';

const Input = ({
  type, name, value, onChange, placeholder,
}) => (
  <input
    type={type}
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="arcane-input"
  />
);

export default Input;
