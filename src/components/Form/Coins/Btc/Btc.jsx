import React from 'react';

import Switch from '../../Switch/Switch';

import btcIcon from '../../../../img/bitcoin.svg';

const BtcCoin = ({ checked, onChange }) => (
  <div className="coin-icon flex-column align-center">
    <img src={btcIcon} alt="bitcoin" />
    <Switch
      value="BTC"
      name="accepted_crypto"
      checked={checked}
      onChange={onChange}
    />
  </div>
);

export default BtcCoin;
