import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { useStore } from '../../../../store';
import Loading from '../../../../components/Loading/Loading';

import RecentOrder from './RecentOrder';

const RecentOrders = () => {
  const {
    user: {
      seller: { statsLoaded, loadStats, recentOrders },
    },
  } = useStore('auth');

  useEffect(() => {
    loadStats();
  }, []);

  if (!statsLoaded) return <Loading />;

  return (
    <div className="recent-orders">
      <div className="orders">
        {recentOrders.map((order) => (
          <RecentOrder key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default observer(RecentOrders);
