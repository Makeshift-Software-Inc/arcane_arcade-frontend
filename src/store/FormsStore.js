import { types } from 'mobx-state-tree';
import SignUp from './forms/SignUp';
import Login from './forms/Login';
import TwoFactorAuth from './forms/TwoFactorAuth';
import ForgotPassword from './forms/ForgotPassword';
import Onboarding from './forms/Onboarding';
import Listing from './forms/Listing';
import CoinWallet from './forms/CoinWallet';
import Buy from './forms/Buy';
import Search from './forms/Search';

const FormsStore = types
  .model('Forms', {
    signUp: types.optional(SignUp, {}),
    login: types.optional(Login, {}),
    two_factor_auth: types.optional(TwoFactorAuth, {}),
    forgot_password: types.optional(ForgotPassword, {}),
    onboarding: types.optional(Onboarding, {}),
    listing: types.optional(Listing, {}),
    coin_wallet: types.optional(CoinWallet, {}),
    buy: types.optional(Buy, {}),
    search: types.optional(Search, {}),
  })
  .actions(() => ({}));

export default FormsStore;
