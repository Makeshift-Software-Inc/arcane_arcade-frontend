import React from 'react';

const RecentOrder = ({ order }) => (
  <div className="order flex-row">
    <div className="order-image">
      <img src={order.owned_game.image} alt={order.owned_game.title} />
    </div>
    <div className="order-details flex-row flex-grow justify-between">
      <div className="order-details-basic flex-column">
        <p>
          Order ID:
          {order.id}
        </p>
        <p>
          Game:
          {order.owned_game.title}
        </p>
      </div>
      <div className="order-details-payment flex-column">
        <p>
          Purchase Date:
          {order.purchaseDate()}
        </p>
        <p>
          Coin amount:
          {' '}
          {order.coin_amount}
          {' '}
          {order.coin_type}
        </p>
      </div>
    </div>
  </div>
);

export default RecentOrder;
