import React from 'react';

import Btc from './Btc/Btc';
import Xmr from './Xmr/Xmr';

import './Coins.scss';

const Coins = ({ btcChecked, xmrChecked, onChange }) => (
  <div className="crypto-coins-switch flex-row">
    <Btc checked={btcChecked} onChange={onChange} />
    <Xmr checked={xmrChecked} onChange={onChange} />
  </div>
);

export default Coins;
