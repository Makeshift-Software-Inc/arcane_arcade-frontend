import { types, getRoot } from 'mobx-state-tree';
import WAValidator from 'wallet-address-validator';
import Base from './Base';
import DestinationAddresses from '../models/DestinationAddresses';

const CoinWallet = types
  .model('CoinWallet', {
    accepted_crypto: types.array(types.string),
    destination_addresses: types.optional(DestinationAddresses, {}),
    prepared: false,
  })
  .views((self) => ({
    keysForValidation() {
      return ['acceptedCrypto', 'btc', 'xmr'];
    },
    acceptedCryptoValidation() {
      if (self.accepted_crypto.length === 0) {
        return ['Please select at least one crypto currency'];
      }
      return false;
    },
    btcValidation() {
      const coin = 'BTC';
      if (!self.accepted_crypto.find((key) => key === coin)) return false;
      const address = self.destination_addresses[coin];
      if (!address || address.trim().length === 0) {
        return [self.validationError('blank')];
      }
      if (!WAValidator.validate(address, coin, 'both')) {
        return ['invalid address'];
      }

      return false;
    },
    xmrValidation() {
      const coin = 'XMR';
      if (!self.accepted_crypto.find((key) => key === coin)) return false;
      const address = self.destination_addresses[coin];
      if (!address || address.trim().length === 0) {
        return [self.validationError('blank')];
      }

      if (!WAValidator.validate(address, coin, 'both')) {
        return ['invalid address'];
      }

      return false;
    },
  }))
  .actions((self) => ({
    prepare() {
      if (self.prepared) return;

      const {
        auth: {
          user: { seller },
        },
      } = getRoot(self);
      self.accepted_crypto = seller.accepted_crypto.toJSON();
      self.destination_addresses = seller.destination_addresses
        ? seller.destination_addresses.toJSON()
        : { BTC: '', XMR: '' };

      self.prepared = true;
    },
    reset() {
      self.accepted_crypto = [];
      self.destination_addresses = {};
      self.prepared = false;
      self.errors = {};
    },
  }));

export default types.compose(Base, CoinWallet);
