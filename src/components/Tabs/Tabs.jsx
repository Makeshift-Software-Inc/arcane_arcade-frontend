import React from 'react';

import './Tabs.scss';

const Tabs = ({ options, active, onChange }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onChange(e.target.name);
  };
  return (
    <div className="arcane-tabs">
      {options.map((option) => (
        <a
          key={option.name}
          href="#"
          name={option.name}
          onClick={handleClick}
          className={`arcane-tab ${active === option.name ? 'active' : ''}`}
        >
          {option.text}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
