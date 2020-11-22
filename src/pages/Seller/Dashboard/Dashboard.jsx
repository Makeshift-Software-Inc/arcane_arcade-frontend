import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Helmet } from 'react-helmet';

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
    { name: 'recent_orders', text: 'Orders' },
  ];

  const renderActiveTab = () => {
    if (activeTab === 'games') return <Games />;
    if (activeTab === 'payments') return <Payments />;

    return <RecentOrders />;
  };
  const metaDesc = 'Manage your games and review your orders. Set your Bitcoin and/or Monero addresses.';

  return (
    <div className="App seller-dashboard flex-column">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Seller Dashboard</title>
        <meta name="description" content={metaDesc} />
      </Helmet>

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
