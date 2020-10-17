import React, { useEffect, useState } from 'react';

import { observer } from 'mobx-react';
import { useStore } from '../../store';

import Loading from '../../components/Loading/Loading';
import Navbar from '../../components/Navbar/Navbar';
import Tabs from '../../components/Tabs/Tabs';

import Orders from './Orders/Orders';
import OrderDetailsModal from './Modal/Modal';

import './MyLibrary.scss';

const NoOrdersYet = () => <p>You still don't have any orders.</p>;

const MyLibrary = ({ match }) => {
  console.log(match.params);

  const { tab, orderId } = match.params;

  const [activeTab, setActiveTab] = useState(tab ? tab : 'completed_orders');
  // const [detailsForOrder, setDetailsForOrder] = useState(orderId ? orderId : null);

  const {
    user: { loadOrders, loadingOrders, completedOrders, activeOrders, setSelectedOrder },
  } = useStore('auth');

  useEffect(() => {
    loadOrders();
  }, []);

  if (loadingOrders) return <Loading />;

  const options = [
    { name: 'completed_orders', text: 'My Library' },
    { name: 'active_orders', text: 'My Orders' },
  ];

  const orders =
    activeTab === 'completed_orders' ? completedOrders() : activeOrders();

  const handleOrderClick = (order) => {
    setSelectedOrder(order.id)
  }

  return (
    <div className="App my-library">
      <Navbar />
      <div className="my-library-content flex-column">
        <Tabs options={options} active={activeTab} onChange={setActiveTab} />
        {orders.length === 0 ? <NoOrdersYet /> : <Orders onClick={handleOrderClick} detailsText="Countinue Order" orders={orders} />}
      </div>
      <OrderDetailsModal />
    </div>
  );
};

export default observer(MyLibrary);
