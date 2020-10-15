import React from 'react';

import './Select.scss';

const Select = ({ options, name, onChange, selected }) => {
  return (
    <div className="buy-modal-select flex-row align-self-stretch justify-around">
      {options.map((option) => (
        <label key={option.value} className="flex-column align-center">
          <img src={option.icon} alt={option.value} />
          <input
            onChange={onChange}
            type="radio"
            name={name}
            checked={selected === option.value}
            value={option.value}
          />
        </label>
      ))}
    </div>
  );
};

export default Select;
