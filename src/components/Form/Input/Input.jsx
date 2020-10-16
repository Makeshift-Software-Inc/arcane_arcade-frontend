import React from 'react';

import './Input.scss';

const Input = ({
  type, name, value, onChange, placeholder, label, labelClass, className, ref,
}) => (
  <>
    {label && <p className={`label ${labelClass}`}>{label}</p>}
    <input
      ref={ref}
      type={type || 'text'}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || ''}
      className={`arcane-input ${className}`}
    />
  </>
);

export default Input;
