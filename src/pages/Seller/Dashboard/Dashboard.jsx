import React, { useState } from 'react';
import { observer } from 'mobx-react';

import './Dashboard.scss';
import Navbar from '../../../components/Navbar/Navbar';

import Tabs from './Tabs';

import Games from './Games';
import Payments from './Payments';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('games');

  const handleTabClick = (e) => {
    e.preventDefault();

    setActiveTab(e.target.name);
  };

  const tabOptions = [
    { name: 'games', text: 'My Game(s)' },
    { name: 'payments', text: 'Dashboard' },
  ];

  return (
    <div className="App seller-dashboard">
      <Navbar />

      <Tabs
        options={tabOptions}
        selectedTab={activeTab}
        onClick={handleTabClick}
      />

      {activeTab === 'games' ? <Games /> : <Payments />}
    </div>
  );
};

export default observer(SellerDashboard);
