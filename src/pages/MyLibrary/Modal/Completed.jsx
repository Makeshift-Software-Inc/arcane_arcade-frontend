import React from 'react';

const Completed = ({ order }) => (
  <div className="completed-order">
    <h1>{order.owned_game.title}</h1>
    <div className="flex-column">
      <span className="label">Order ID</span>
      <p>{order.id}</p>
    </div>
    <div className="flex-column">
      <span className="label">Amount Paid</span>
      <p>
        {order.coin_amount}
        {' '}
        {order.coin_type}
      </p>
    </div>
    <div className="flex-column">
      <span className="label">Purchase Date</span>
      <p>{order.purchaseDate()}</p>
    </div>
    <div className="flex-column">
      <span className="label">{order.owned_game.methodName()}</span>
      <div className="flex-row align-center">
        <p className="platform">{order.owned_game.platform}</p>
        {order.owned_game.method === 'steam_keys' ? (
          <input
            type="text"
            readOnly
            value={order.owned_game.platformKey()}
          />
        ) : (
          <a href={order.owned_game.platformKey()} download>
            Download
          </a>
        )}
      </div>
    </div>
  </div>
);

export default Completed;
