import React from 'react';

import './SystemRequirementsTabs.scss';

const SystemRequirementsTabs = ({
  selectedTab,
  options,
  setSelectedTab,
  mobile,
}) => {
  const onClick = (e) => {
    e.preventDefault();
    setSelectedTab(e.target.name);
  };

  return (
    <div
      className={`system-requirement-tabs flex-row ${mobile ? 'mobile' : ''}`}
    >
      {options.map((option) => (
        <a
          href="#"
          className={`system-requirement-tab ${
            selectedTab === option ? 'selected' : ''
          }`}
          key={option}
          name={option}
          onClick={onClick}
        >
          {option}
        </a>
      ))}
    </div>
  );
};

export default SystemRequirementsTabs;
