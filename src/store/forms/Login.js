import { types } from 'mobx-state-tree';
import Base from './Base';

const Login = types
  .model('Login', {
    username: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
  })
  .views((self) => ({
    keysForValidation() {
      return ['username', 'password'];
    },
    usernameValidation() {
      if (self.username.trim().length === 0) {
        return [self.validationError('blank')];
      }
      return false;
    },
    passwordValidation() {
      if (self.password.length === 0) {
        return [self.validationError('blank')];
      }
      return false;
    },
  }))
  .actions(() => ({}));

export default types.compose(Base, Login);
