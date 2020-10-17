import React from 'react';

import Order from './Order';

import './Orders.scss';

const Orders = ({ orders }) => {
  return (
    <div className="arcane-orders">
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
