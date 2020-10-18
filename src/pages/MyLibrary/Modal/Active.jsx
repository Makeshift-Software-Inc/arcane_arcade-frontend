import React, { useEffect } from 'react';

import Countdown from 'react-countdown';

const RELOAD_EVERY = 10; // in seconds

const Active = ({ order }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      order.reload();
    }, RELOAD_EVERY * 1000);

    order.reload();

    return () => {
      clearInterval(interval);
    };
  }, []);

  const expiresAt = new Date(order.expires_at);

  return (
    <div className="active-order flex-column align-center">
      <p>
        Order ID:
        {order.id}
      </p>
      <img className="qr-code" src={order.qr_url} alt={order.escrow_address} />
      <p>
        Send exactly
        {' '}
        <b>
          {order.coin_amount}
          {' '}
          {order.coin_type}
        </b>
        {' '}
        to:
      </p>
      <p className="address">
        <b>{order.escrow_address}</b>
      </p>
      <p>
        <span>Expires In:</span>
        <span className="expires-in-countdown">
          <Countdown date={expiresAt}>
            <span>EXPIRED</span>
          </Countdown>
        </span>
      </p>
    </div>
  );
};

export default Active;
