import { types, getRoot } from 'mobx-state-tree';
import Base from './Base';

const Buy = types
  .model('Buy', {
    listing_id: types.optional(types.string, ''),
    platform: types.optional(types.string, ''),
    payment_method: types.optional(types.string, ''),
    currentStep: 0,
    supportedPlatforms: types.array(types.string),
    purchasedPlatforms: types.array(types.string),
    availablePlatforms: types.array(types.string),
    paymentOptions: types.array(types.string),
    prepared: false,
  })
  .views((self) => ({
    keysForValidation() {
      switch (self.currentStep) {
        case 0:
          return ['platform'];
        case 1:
          return ['paymentMethod'];
        default:
          return [];
      }
    },
    platformValidation() {
      if (self.platform.length === 0) {
        self.errors.addFullMessageError('Please choose a platform.');
        return ['Please choose a platform'];
      }
      return false;
    },
    paymentMethodValidation() {
      if (self.payment_method.length === 0) {
        self.errors.addFullMessageError('Please choose a payment method.');
        return ['Please choose a payment method'];
      }
      return false;
    },
  }))
  .actions((self) => ({
    prepare() {
      if (self.prepared) return;

      const {
        games: { selectedGame },
        auth: {
          user: { orders },
        },
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

      const PC_PLATFORMS = ['MAC', 'WINDOWS', 'LINUX'];

      self.purchasedPlatforms = orders
        .filter((order) => order.listing_id === selectedGame.id)
        .map((order) => (PC_PLATFORMS.includes(order.owned_game.platform)
          ? PC_PLATFORMS
          : order.owned_game.platform))
        .flat();

      self.availablePlatforms = self.supportedPlatforms.filter(
        (platform) => !self.purchasedPlatforms.includes(platform),
      );

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
    reset() {
      self.listing_id = '';
      self.platform = '';
      self.payment_method = '';
      self.currentStep = 0;
      self.errors = {};
      self.supportedPlatforms = [];
      self.paymentOptions = [];
      self.prepared = false;
    },
  }));

export default types.compose(Base, Buy);
