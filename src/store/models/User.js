import { types, flow, getRoot } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';
import Seller from './Seller';
import Order from './Order';

import Api from '../../services/Api';
import deserialize from '../../utils/deserialize';

const User = types
  .model('User', {
    id: types.identifier,
    username: types.string,
    email: types.string,
    phone_number: types.string,
    activation_state: types.enumeration(['pending', 'active']),
    seller: types.maybeNull(Seller),
    orders: types.array(Order),
    loadingSeller: false,
    creatingOrder: false,
  })
  .views((self) => ({
    activated() {
      return self.activation_state === 'active';
    },
    isSeller() {
      return !!self.seller;
    },
  }))
  .actions((self) => ({
    createSeller: flow(function* create() {
      self.loadingSeller = true;

      const {
        forms: {
          onboarding: { acceptedCrypto, fiatCurrency, companyName, studioSize },
        },
      } = getRoot(self);

      const seller = {
        accepted_crypto: acceptedCrypto,
        default_currency: fiatCurrency,
        business_name: companyName,
        studio_size: studioSize,
      };

      try {
        const response = yield Api.post('/sellers', { seller });
        self.seller = deserialize(response.data);
        self.loadingSeller = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loadingSeller = false;
        return false;
      }
    }),
    createOrder: flow(function* createOrder() {
      self.creatingOrder = true;
      const {
        forms: { buy },
      } = getRoot(self);

      const order = {
        listing_id: buy.listing_id,
        coin_type: buy.payment_method,
        platform: buy.platform,
      };

      try {
        const response = yield Api.post('/orders', { order });
        console.log(response.data);
        console.log(deserialize(response.data));
        // self.seller = deserialize(response.data);
        self.creatingOrder = false;
        return true;
      } catch (e) {
        console.log(e);
        self.creatingOrder = false;
        return false;
      }
    }),
  }));

export default types.compose(BaseUpdate, User);
