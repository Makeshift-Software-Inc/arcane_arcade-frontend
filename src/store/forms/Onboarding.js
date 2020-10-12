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
  .actions((self) => ({
    nextStep() {
      self.currentStep += 1;
    },
    previousStep() {
      self.currentStep -= 1;
    },
    reset() {
      self.currentStep = 0;
      self.isSeller = false;
      self.sellWithUs = false;
    },
    addCrypto(name) {
      self.acceptedCrypto.push(name);
    },
    removeCrypto(name) {
      self.acceptedCrypto = self.acceptedCrypto.filter(
        (crypto) => crypto === name,
      );
    },
    validate: () => true,
  }));

export default types.compose(Base, Onboarding);
