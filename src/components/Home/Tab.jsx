import React from 'react';

const Tab = ({ text, selected, onClick }) => (
  <div className="tab">
    {/* eslint-disable jsx-a11y/click-events-have-key-events */}
    <a
      className={selected ? 'selected' : ''}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {text}
    </a>
    {/* eslint-enable jsx-a11y/click-events-have-key-events */}
  </div>
);


export default Tab;