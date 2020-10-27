import React, { useState } from 'react';
import { observer } from 'mobx-react';

import './Dashboard.scss';
import Navbar from '../../../components/Navbar/Navbar';

import Tabs from './Tabs/Tabs';
import Games from './Tabs/Games';
import Payments from './Tabs/Payments';
import RecentOrders from './Tabs/RecentOrders';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('games');

  const handleTabClick = (e) => {
    e.preventDefault();

    setActiveTab(e.target.name);
  };

  const tabOptions = [
    { name: 'games', text: 'My Game(s)' },
    { name: 'payments', text: 'Dashboard' },
    { name: 'recent_orders', text: 'Recent Orders' },
  ];

  const renderActiveTab = () => {
    if (activeTab === 'games') return <Games />;
    if (activeTab === 'payments') return <Payments />;

    return <RecentOrders />;
  };

  return (
    <div className="App seller-dashboard">
      <Navbar />

      <Tabs
        options={tabOptions}
        selectedTab={activeTab}
        onClick={handleTabClick}
      />

      {renderActiveTab()}
    </div>
  );
};

export default observer(SellerDashboard);
