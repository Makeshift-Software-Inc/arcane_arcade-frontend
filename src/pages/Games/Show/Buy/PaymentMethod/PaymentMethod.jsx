import React from 'react';

import Select from '../Select/Select';

import btcIcon from '../../../../../img/bitcoin.svg';
import xmrIcon from '../../../../../img/monero.svg';

const ICONS = {
  BTC: btcIcon,
  XMR: xmrIcon,
};

const PaymentMethod = ({ update, payment_method, paymentOptions }) => {
  const options = paymentOptions.map((name) => ({
    value: name,
    icon: ICONS[name],
  }));

  const onChange = (e) => {
    update({ payment_method: e.target.value });
  };

  return (
    <Select
      options={options}
      selected={payment_method}
      onChange={onChange}
      name="payment_method"
    />
  );
};

export default PaymentMethod;
