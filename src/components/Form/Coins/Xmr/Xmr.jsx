import React from 'react';

import Switch from '../../Switch/Switch';

import xmrIcon from '../../../../img/monero.svg';

const XmrCoin = ({ checked, onChange }) => (
  <div className="coin-icon flex-column align-center">
    <img src={xmrIcon} alt="monero" />
    <Switch
      value="XMR"
      name="accepted_crypto"
      checked={checked}
      onChange={onChange}
    />
  </div>
);

export default XmrCoin;
