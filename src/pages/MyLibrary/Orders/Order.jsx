import React from 'react';

import './Order.scss';

const Order = ({ order }) => {
  return (
    <div className="arcane-order">
      <img src={order.owned_game.image} alt={order.owned_game.title} />
      <div className="order-details">
        <a href="#">Order Details</a>
      </div>
    </div>
  );
};

export default Order;
