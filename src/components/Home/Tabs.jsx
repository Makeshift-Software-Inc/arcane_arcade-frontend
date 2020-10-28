import React from 'react';

import Tab from './Tab';

const Tabs = ({selectedTab, setSelectedTab, mobile}) => (
  <div className={mobile ? "tabs-mobile flex-column" : "tabs flex-row"}>
    <Tab
      text="Discover"
      selected={selectedTab === 'discover'}
      onClick={() => setSelectedTab('discover')}
    />
    <Tab
      text="Explore"
      selected={selectedTab === 'explore'}
      onClick={() => setSelectedTab('explore')}
    />
  </div>
);

export default Tabs;