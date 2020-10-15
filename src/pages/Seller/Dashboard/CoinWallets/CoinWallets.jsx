import React, { useEffect } from 'react';

import { toast } from 'react-toastify';

import { observer } from 'mobx-react';
import Modal from '../../../../components/Modals/Modal';
import Header from '../../../../components/Modals/Header/Header';
import Submit from '../../../../components/Form/Submit/Submit';
import Input from '../../../../components/Form/Input/Input';
import Errors from '../../../../components/Errors/Errors';
import Loading from '../../../../components/Loading/Loading';
import Coins from '../../../../components/Form/Coins/Coins';

import { useStore } from '../../../../store';

import './CoinWallets.scss';

const CoinWallets = ({ close }) => {
  const {
    forms: {
      coin_wallet: {
        update,
        prepare,
        accepted_crypto,
        destination_addresses,
        validate,
        errors,
        reset,
      },
    },
    auth: {
      user: {
        seller: { addingDestinationAddresses, addDestinationAddresses },
      },
    },
  } = useStore();

  useEffect(() => {
    prepare();
  }, [prepare]);

  const save = async (e) => {
    e.preventDefault();
    if (validate()) {
      const destinationAddresses = {};
      if (destinationAddresses.BTC) {
        destinationAddresses.BTC = destination_addresses.BTC.trim().length > 0
        ? destination_addresses.BTC
        : null;
      }
      if (destinationAddresses.XMR) {
        destinationAddresses.XMR = destination_addresses.XMR.trim().length > 0
        ? destination_addresses.XMR
        : null;
      }

      const seller = {
        accepted_crypto: accepted_crypto.toJSON(),
        destination_addresses: destinationAddresses,
      };
      if (await addDestinationAddresses(seller)) {
        reset();
        close();
        toast('Destination addresses added.');
      }
    }
  };

  const handleAddressChange = (e) => {
    destination_addresses.update({ [e.target.name]: e.target.value });
  };

  const handleAcceptedCryptoChange = (value, checked) => {
    if (checked) {
      update({ accepted_crypto: [...accepted_crypto, value] });
    } else {
      update({
        accepted_crypto: accepted_crypto.filter((name) => name !== value),
      });
    }
  };

  const checked = (name) => !!accepted_crypto.find((crypto) => crypto === name);

  const btcChecked = checked('BTC');
  const xmrChecked = checked('XMR');

  return (
    <Modal>
      {addingDestinationAddresses ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Header close={close} title="Coin Wallets" />
          <div className="coin-wallets-modal">
            <form onSubmit={save} className="flex-column align-center">
              <Coins
                onChange={handleAcceptedCryptoChange}
                btcChecked={btcChecked}
                xmrChecked={xmrChecked}
              />
              <div className="flex-row align-self-stretch justify-around destination-addresses">
                <div className="address-wrapper">
                  {btcChecked && (
                    <Input
                      onChange={handleAddressChange}
                      value={destination_addresses.BTC || ''}
                      name="BTC"
                      placeholder="Enter your Bitcoin address"
                    />
                  )}
                </div>
                <div className="address-wrapper">
                  {xmrChecked && (
                    <Input
                      onChange={handleAddressChange}
                      value={destination_addresses.XMR || ''}
                      name="XMR"
                      placeholder="Enter your Monero address"
                    />
                  )}
                </div>
              </div>
              <Errors errors={errors.full_messages.toJSON()} />
              <Submit text="SAVE" green />
            </form>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
};

export default observer(CoinWallets);
