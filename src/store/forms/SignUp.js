import { types } from 'mobx-state-tree';
import Base from './Base';

const SignUp = types
  .model('SignUp', {
    username: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    password_confirmation: types.optional(types.string, ''),
    email: types.optional(types.string, ''),
    phone_number: types.optional(types.string, ''),
  })
  .views((self) => ({
    keysForValidation() {
      return [
        'username',
        'email',
        'password',
        'password_confirmation',
        'phone_number',
      ];
    },
    usernameValidation() {
      if (self.username.trim().length === 0) {
        return [self.validationError('blank')];
      }
      return false;
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
    phone_numberValidation() {
      if (self.phone_number.trim().length === 0) {
        return [self.validationError('blank')];
      }
      if (!/^\+[0-9]+$/.test(self.phone_number.trim())) {
        return [self.validationError('numbersOnly')];
      }
      if (
        self.phone_number.trim().length < 4
        || self.phone_number.trim().length > 16
      ) {
        return [self.validationError('between', { min: 4, max: 16 })];
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
  }))
  .actions(() => ({}));

export default types.compose(Base, SignUp);
