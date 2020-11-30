import { types } from 'mobx-state-tree';
import Base from './Base';

const ForgotPassword = types
  .model('ForgotPassword', {
    codeSent: false,
    authorized: false,
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    password_confirmation: types.optional(types.string, ''),
  })
  .views((self) => ({
    keysForValidation() {
      if (!self.codeSent) {
        return ['email'];
      }

      if (!self.authorized) return [];

      return ['password', 'password_confirmation'];
    },
  }))
  .actions((self) => ({
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
