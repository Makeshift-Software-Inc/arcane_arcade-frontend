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
        {order.coin_amount} {order.coin_type}
      </p>
    </div>
    <div className="flex-column">
      <span className="label">Purchase Date</span>
      <p>{order.purchaseDate()}</p>
    </div>
    <div className="flex-column">
      <span className="label">{order.owned_game.methodName()}</span>
      {order.owned_game.method === 'steam_keys' ? (
        <div className="flex-row align-center">
          <p className="platform">{order.owned_game.platform}</p>
          <input type="text" readOnly value={order.owned_game.platformKey()} />
        </div>
      ) : (
        order.owned_game.platformKey().map((installer) => (
          <div className="flex-row" key={installer.name}>
            <p className="platform">{installer.name}</p>
            <a href={installer.url} download>
              Download
            </a>
            <br />
          </div>
        ))
      )}
    </div>
  </div>
);

export default Completed;
