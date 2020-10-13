import React from 'react';

import './Toggler.scss';

const Toggler = ({ options, selected, onChange }) => {
  const handleClick = (e) => {
    onChange(e.target.name);
  };

  return (
    <div className="arcane-toggler">
      {options.map((option) => (
        <button
          key={option.value}
          className={`button is-link ${
            selected !== option.value ? 'is-outlined' : ''
          }`}
          name={option.value}
          onClick={handleClick}
          type="button"
        >
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Toggler;
