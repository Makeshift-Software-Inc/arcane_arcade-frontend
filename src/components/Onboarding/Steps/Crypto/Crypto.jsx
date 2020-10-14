import React from 'react';

import { observer } from 'mobx-react';

import Question from '../../Question/Question';
import Switch from '../../../Form/Switch/Switch';

import Coins from '../../../Form/Coins/Coins';

import './Crypto.scss';

const Crypto = ({ update, acceptedCrypto }) => {
  const handleChange = (value, checked) => {
    if (checked) {
      update({ acceptedCrypto: [...acceptedCrypto, value] });
    } else {
      update({
        acceptedCrypto: acceptedCrypto.filter((name) => name !== value),
      });
    }
  };

  const checked = (name) => !!acceptedCrypto.find((crypto) => crypto === name);

  const btcChecked = checked('BTC');
  const xmrChecked = checked('XMR');

  return (
    <React.Fragment>
      <Question text="Which cryptocurrency would you like to be paid in?" />
      <Coins
        onChange={handleChange}
        btcChecked={btcChecked}
        xmrChecked={xmrChecked}
      />
    </React.Fragment>
  );
};

export default observer(Crypto);
