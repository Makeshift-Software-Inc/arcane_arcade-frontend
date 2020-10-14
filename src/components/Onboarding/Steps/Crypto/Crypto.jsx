import React from 'react';

import { observer } from 'mobx-react';

import Question from '../../Question/Question';
import Switch from '../../../Form/Switch/Switch';

import btcIcon from '../../../../img/bitcoin.svg';
import xmrIcon from '../../../../img/monero.svg';

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
      <div className="flex-row">
        <div className="coin-icon flex-column align-center">
          <img src={btcIcon} alt="bitcoin" />
          <Switch
            value="BTC"
            name="accepted_crypto"
            checked={btcChecked}
            onChange={handleChange}
          />
        </div>
        <div className="coin-icon flex-column align-center">
          <img src={xmrIcon} alt="monero" />
          <Switch
            value="XMR"
            name="accepted_crypto"
            checked={xmrChecked}
            onChange={handleChange}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default observer(Crypto);
