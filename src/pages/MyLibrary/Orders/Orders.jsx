import React from 'react';

import Order from './Order';

import './Orders.scss';

const Orders = ({ orders, detailsText, onClick }) => {
  return (
    <div className="arcane-orders">
      {orders.map((order) => (
        <Order onClick={onClick} detailsText={detailsText} key={order.id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
