import React from 'react';

const Tabs = ({ options, selectedTab, onClick }) => (
  <div className="links">
    {options.map((option) => (
      // eslint-disable-next-line
      <a
        key={option.name}
        role="link"
        className={selectedTab === option.name ? 'selected' : ''}
        tabIndex={0}
        name={option.name}
        onClick={onClick}
      >
        {option.text}
      </a>
    ))}
  </div>
);

export default Tabs;
