import React, { useState } from 'react';

import Navbar from '../../components/Navbar/Navbar';

import Tabs from './Tabs/Tabs';
import PendingSellers from './PendingSellers/PendingSellers';
import PendingListings from './PendingListings/PendingListings';

import './Dashboard.scss';

const TAB_OPTIONS = [
  { name: 'Pending Sellers', value: 'pending_sellers' },
  { name: 'Pending Listings', value: 'pending_listings' },
];

const COMPONENTS = {
  pending_sellers: PendingSellers,
  pending_listings: PendingListings,
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('pending_sellers');

  const ActiveTab = COMPONENTS[activeTab];

  return (
    <div className="App admins-dashboard">
      <Navbar />

      <Tabs
        activeTab={activeTab}
        options={TAB_OPTIONS}
        setActiveTab={setActiveTab}
      />

      <div className="dashboard-content flex-row justify-center">
        <ActiveTab />
      </div>
    </div>
  );
};

export default Dashboard;
