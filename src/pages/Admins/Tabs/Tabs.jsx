import React from 'react';

import './Tabs.scss';

const Tabs = ({ activeTab, options, setActiveTab }) => {
  const onTabClick = (e) => {
    e.preventDefault();
    setActiveTab(e.target.name);
  };

  return (
    <div className="admin-tabs flex-row flex-wrap justify-center">
      {options.map((option) => (
        <a
          key={option.value}
          href="#"
          className={`admin-tab ${activeTab === option.value ? 'active' : ''}`}
          name={option.value}
          onClick={onTabClick}
        >
          {option.name}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
