import { types } from 'mobx-state-tree';
import Base from './Base';

const TwoFactorAuth = types.model('TwoFactorAuth', {
  delivery_method: types.optional(types.enumeration(['sms', 'email']), 'email'),
  codeSent: false,
});

export default types.compose(Base, TwoFactorAuth);
