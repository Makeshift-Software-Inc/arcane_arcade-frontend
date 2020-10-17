import { types, getRoot } from 'mobx-state-tree';
import Base from './Base';
import Errors from './Errors';

const Buy = types
  .model('Buy', {
    listing_id: types.optional(types.string, ''),
    platform: types.optional(types.string, ''),
    payment_method: types.optional(types.string, ''),
    currentStep: 0,
    errors: types.optional(Errors, {}),
    supportedPlatforms: types.array(types.string),
    paymentOptions: types.array(types.string),
    prepared: false,
  })
  .actions((self) => ({
    prepare() {
      if (self.prepared) return;
      const {
        games: { selectedGame },
      } = getRoot(self);
      self.listing_id = selectedGame.id;
      self.supportedPlatforms = selectedGame
        .supportedPlatformsToBuy()
        .map((distribution) => distribution.supported_platform.name);
      if (selectedGame.accepts_bitcoin) {
        self.paymentOptions.push('BTC');
      }
      if (selectedGame.accepts_monero) {
        self.paymentOptions.push('XMR');
      }

      self.prepared = true;
    },
    nextStep() {
      const valid = self.validate();
      if (!valid) return false;

      if (self.currentStep < 1) {
        self.currentStep += 1;
      }
      return true;
    },
    previousStep() {
      self.currentStep -= 1;
    },
    validate: () => {
      self.errors = {};
      switch (self.currentStep) {
        case 0:
          if (self.platform.length === 0) {
            self.errors.addFullMessageError('Please choose a platform.');
            return false;
          }
          if (!self.supportedPlatforms.includes(self.platform)) {
            self.errors.addFullMessageError(
              `${self.platform} is not supported by this game.`,
            );
            return false;
          }
          return true;
        case 1:
          if (self.payment_method.length === 0) {
            self.errors.addFullMessageError('Please choose a payment method.');
            return false;
          }
          if (!self.paymentOptions.includes(self.payment_method)) {
            self.errors.addFullMessageError(
              `${self.payment_method} is not supported by this seller.`,
            );
            return false;
          }
          return true;
        default:
          return true;
      }
    },
  }));

export default types.compose(Base, Buy);
