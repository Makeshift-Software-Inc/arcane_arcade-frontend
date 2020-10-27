import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { observer } from 'mobx-react';
import { useStore } from '../../store';

import Loading from '../../components/Loading/Loading';
import Navbar from '../../components/Navbar/Navbar';
import Tabs from '../../components/Tabs/Tabs';

import Orders from './Orders/Orders';
import OrderDetailsModal from './Modal/Modal';

import './MyLibrary.scss';

const NoOrdersYet = () => <p>You still don&apos;t have any orders.</p>;

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState('completed_orders');

  const {
    user: {
      loadOrders,
      loadingOrders,
      paidOrders,
      activeOrders,
      selectedOrder,
      setSelectedOrder,
    },
  } = useStore('auth');

  useEffect(() => {
    loadOrders();
  }, []);

  if (loadingOrders) return <Loading />;

  const options = [
    { name: 'completed_orders', text: 'My Library' },
    { name: 'active_orders', text: 'My Orders' },
  ];

  const orders = activeTab === 'completed_orders' ? paidOrders() : activeOrders();

  const handleOrderClick = (order) => {
    setSelectedOrder(order.id);
  };

  const detailsText = activeTab === 'completed_orders' ? 'Order Details' : 'Continue Order';

  const metaDesc = 'View your purchased games and outstanding orders.';

  return (
    <div className="App my-library">
      <Helmet>
        <meta charSet="utf-8" />
        <title>My Library</title>
        <meta
          name="description"
          content={metaDesc}
        />
      </Helmet>

      <Navbar />
      <div className="my-library-content flex-column">
        <Tabs options={options} active={activeTab} onChange={setActiveTab} />
        {orders.length === 0 ? (
          <NoOrdersYet />
        ) : (
          <Orders
            onClick={handleOrderClick}
            detailsText={detailsText}
            orders={orders}
          />
        )}
      </div>
      <OrderDetailsModal
        order={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </div>
  );
};

export default observer(MyLibrary);
