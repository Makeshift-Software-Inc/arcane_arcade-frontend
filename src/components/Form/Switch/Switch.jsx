import React from 'react';

import './Switch.scss';

const Switch = ({ value, checked, onChange }) => {
  const handleClick = () => {
    onChange(value, !checked);
  };

  return (
    <div className="arcane-switch">
      {/* eslint-disable-next-line */}
      <div
        className={`switch-line ${checked ? 'checked' : ''}`}
        onClick={handleClick}
      />
    </div>
  );
};

export default Switch;
