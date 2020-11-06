import React from 'react';

const Select = ({
  value, onChange, options, name, id, className, keys = false,
}) => (
  <select value={value} onChange={onChange} name={name} id={id} className={className}>

    {keys

      ? (Object.keys(options).map((option) => (
        <option key={option} value={option}>
          {options[option]}
        </option>
      ))
      ) : (

        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      )}
  </select>
);

export default Select;
