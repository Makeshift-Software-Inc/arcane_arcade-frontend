import { types } from 'mobx-state-tree';
import Base from './Base';
import SessionStorage from '../../services/SessionStorage';

const ForgotPassword = types
  .model('ForgotPassword', {
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    password_confirmation: types.optional(types.string, ''),
    step: types.optional(
      types.enumeration(['email', 'code', 'password']),
      'email',
    ),
    token: types.maybe(types.string),
  })
  .views((self) => ({
    keysForValidation() {
      if (self.stepEmail) {
        return ['email'];
      }

      if (self.stepCode) return [];

      return ['password', 'password_confirmation'];
    },
    get stepEmail() {
      return self.step === 'email';
    },
    get stepCode() {
      return self.step === 'code';
    },
    get stepPassword() {
      return self.step === 'password';
    },
    get stepKey() {
      return 'forgot-password-step';
    },
    get tokenKey() {
      return 'forgot-password-token';
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self.step = SessionStorage.get(self.stepKey) || 'email';
      self.token = SessionStorage.get(self.tokenKey) || undefined;
    },
    updateStep(value) {
      self.step = value;
      SessionStorage.set(self.stepKey, value);
    },
    updateToken(value) {
      self.token = value;
      SessionStorage.set(self.tokenKey, value);
    },
    cancel() {
      self.step = 'email';
      self.token = undefined;
      self.email = '';
      self.password = '';
      self.password_confirmation = '';
      SessionStorage.remove(self.stepKey);
      SessionStorage.remove(self.tokenKey);
    },
    emailValidation() {
      if (self.email.trim().length === 0) {
        return [self.validationError('blank')];
      }
      if (!/\S{2,}@\S{2,}\.\S{2,}/.test(self.email.trim())) {
        return [self.validationError('invalidEmail')];
      }

      return false;
    },
    passwordValidation() {
      if (self.password.length === 0) {
        return [self.validationError('blank')];
      }

      if (self.password.length < 8) {
        return [self.validationError('minlength', { length: 8 })];
      }

      return false;
    },
    password_confirmationValidation() {
      if (self.password_confirmation.length === 0) {
        return [self.validationError('blank')];
      }

      if (self.password !== self.password_confirmation) {
        return [self.validationError('confirmation', { field: 'password' })];
      }

      return false;
    },
  }));

export default types.compose(Base, ForgotPassword);
