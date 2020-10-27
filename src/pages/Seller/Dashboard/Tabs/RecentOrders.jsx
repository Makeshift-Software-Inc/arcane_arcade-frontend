import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../../store';
import Loading from '../../../../components/Loading/Loading';

import Orders from '../../../MyLibrary/Orders/Orders';
import OrderDetailsModal from '../../../MyLibrary/Modal/Modal';

const RecentOrders = () => {
  const {
    user: {
      seller: {
        statsLoaded,
        loadStats,
        recentOrders,
        selectedRecentOrder,
        setSelectedRecentOrder,
      },
    },
  } = useStore('auth');

  useEffect(() => {
    loadStats();
  }, []);

  if (!statsLoaded) return <Loading />;

  const handleOrderClick = (order) => {
    setSelectedRecentOrder(order.id);
  };

  return (
    <div className="recent-orders">
      <div className="orders">
        <Orders
          onClick={handleOrderClick}
          detailsText="Order Details"
          orders={recentOrders}
        />
      </div>
      <OrderDetailsModal
        order={selectedRecentOrder}
        setSelectedOrder={setSelectedRecentOrder}
        withoutDistributionMethod
      />
    </div>
  );
};

export default observer(RecentOrders);
