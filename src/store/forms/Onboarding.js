import { types } from 'mobx-state-tree';
import Base from './Base';

const Onboarding = types
  .model('Onboarding', {
    currentStep: types.optional(types.integer, 0),
    isSeller: types.optional(types.boolean, true),
    sellWithUs: types.optional(types.boolean, true),
    companyName: types.optional(types.string, ''),
    studioSize: types.optional(
      types.enumeration(['INDIE', 'MIDSIZE', 'AAA']),
      'INDIE',
    ),
    fiatCurrency: types.optional(
      types.enumeration([
        'USD',
        'EUR',
        'JPY',
        'GBP',
        'AUD',
        'CAD',
        'CHF',
        'CNY',
        'SEK',
        'NZD',
      ]),
      'USD',
    ),
    acceptedCrypto: types.array(types.string),
  })
  .views((self) => ({
    keysForValidation() {
      switch (self.currentStep) {
        case 2:
          return ['companyName'];
        case 5:
          return ['acceptedCrypto'];
        default:
          return [];
      }
    },
    companyNameValidation() {
      if (self.companyName.trim().length === 0) {
        return [self.validationError('blank')];
      }
      return false;
    },
    acceptedCryptoValidation() {
      if (self.acceptedCrypto.length === 0) {
        return ['Please choose at least one crypto currency.'];
      }
      return false;
    },
  }))
  .actions((self) => ({
    nextStep() {
      const valid = self.validate();
      if (!valid) return false;

      if (self.currentStep < 5) {
        self.currentStep += 1;
      }
      return true;
    },
    previousStep() {
      self.currentStep -= 1;
    },
    reset() {
      self.currentStep = 0;
      self.isSeller = true;
      self.sellWithUs = true;
    },
    addCrypto(name) {
      self.acceptedCrypto.push(name);
    },
    removeCrypto(name) {
      self.acceptedCrypto = self.acceptedCrypto.filter(
        (crypto) => crypto === name,
      );
    },
  }));

export default types.compose(Base, Onboarding);
