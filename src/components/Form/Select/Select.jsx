import React from 'react';

import './Select.scss';

const Select = ({ value, onChange, options }) => (
  <select className="arcane-select" value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.text}
      </option>
    ))}
  </select>
);

export default Select;
