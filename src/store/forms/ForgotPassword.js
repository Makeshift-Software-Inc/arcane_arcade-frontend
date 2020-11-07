import { types } from 'mobx-state-tree';
import Base from './Base';
import Errors from './Errors';

const ForgotPassword = types
  .model('ForgotPassword', {
    codeSent: false,
    authorized: false,
    email: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    password_confirmation: types.optional(types.string, ''),
    errors: types.optional(Errors, {}),
  })
  .actions(() => ({
    validate: () => true,
  }));

export default types.compose(Base, ForgotPassword);
