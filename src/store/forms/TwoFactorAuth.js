import { types } from 'mobx-state-tree';
import Base from './Base';
import Errors from './Errors';

const TwoFactorAuth = types
  .model('TwoFactorAuth', {
    delivery_method: types.optional(types.enumeration(['sms', 'email']), 'email'),
    codeSent: false,
    errors: types.optional(Errors, {}),
  })
  .actions(() => ({
    validate: () => true,
  }));

export default types.compose(Base, TwoFactorAuth);
