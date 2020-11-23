import React from 'react';

import './Order.scss';

const Order = ({ order, detailsText, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(order);
  };

  return (
    <div className="arcane-order">
      <img
        src={order.owned_game.image.smallImage}
        alt={order.owned_game.title}
      />
      <div className="order-details">
        <a onClick={handleClick} href="#">
          {detailsText}
        </a>
      </div>
    </div>
  );
};

export default Order;
