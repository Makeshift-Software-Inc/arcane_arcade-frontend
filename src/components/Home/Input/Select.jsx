import React from 'react';

const Select = ({ value, onChange, options, name, id, keys = false }) => (
  <select className="" value={value} onChange={onChange} name={name} id={id} >

    {keys ?  

      (Object.keys(options).map((option) => (
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
    )

  }
  </select>
);

export default Select;