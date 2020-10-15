import { types, getRoot } from 'mobx-state-tree';
import WAValidator from 'wallet-address-validator';
import Base from './Base';
import Errors from './Errors';
import DestinationAddresses from '../models/DestinationAddresses';

const CoinWallet = types
  .model('CoinWallet', {
    accepted_crypto: types.array(types.string),
    destination_addresses: types.optional(DestinationAddresses, {}),
    errors: types.optional(Errors, {}),
    prepared: false,
  })
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
    validate: () => {
      self.errors = {};
      if (self.accepted_crypto.length === 0) {
        self.errors.update({
          full_messages: ['Please choose at least one crypto currency.'],
        });
        return false;
      }
      self.accepted_crypto.forEach((currency) => {
        if (self.destination_addresses[currency]) {
          if (self.destination_addresses[currency].trim().length === 0) {
            self.errors.addFullMessageError(
              `${currency} address can't be blank.`
            );
          } else if (
            !WAValidator.validate(
              self.destination_addresses[currency],
              currency
            )
          ) {
            self.errors.addFullMessageError(
              `${currency} address is not valid.`
            );
          }
        }
      });
      if (self.errors.full_messages.length > 0) {
        return false;
      }
      return true;
    },
  }));

export default types.compose(Base, CoinWallet);
