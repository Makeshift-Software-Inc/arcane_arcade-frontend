import {
  types, flow, getRoot, destroy,
} from 'mobx-state-tree';
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
    admin: types.boolean,
    selectedOrder: types.maybe(types.reference(Order)),
    loadingSeller: false,
    creatingOrder: false,
    loadingOrders: false,
    ordersLoaded: false,
  })
  .views((self) => ({
    activated() {
      return self.activation_state === 'active';
    },
    isSeller() {
      return !!self.seller;
    },
    activeOrders() {
      return self.orders.filter((order) => order.active());
    },
    paidOrders() {
      return self.orders.filter((order) => order.paid());
    },
    completedOrders() {
      return self.orders.filter((order) => order.completed());
    },
    ownSelectedGame() {
      const {
        games: { selectedGame },
      } = getRoot(self);

      const supportedPlatforms = selectedGame
        .supportedPlatformsToBuy()
        .map((distribution) => distribution.supported_platform.name);

      const PC_PLATFORMS = ['MAC', 'WINDOWS', 'LINUX'];

      const purchasedPlatforms = self.orders
        .filter((order) => order.listing_id === selectedGame.id)
        .map((order) => (PC_PLATFORMS.includes(order.owned_game.platform)
          ? PC_PLATFORMS
          : order.owned_game.platform))
        .flat();

      return (
        supportedPlatforms.filter(
          (platform) => !purchasedPlatforms.includes(platform),
        ).length === 0
      );
    },
  }))
  .actions((self) => ({
    createSeller: flow(function* create() {
      self.loadingSeller = true;

      const {
        forms: {
          onboarding: {
            acceptedCrypto, fiatCurrency, companyName, studioSize,
          },
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
        const newOrder = deserialize(response.data);
        self.orders.push(newOrder);
        self.selectedOrder = newOrder.id;
        buy.reset();
        self.creatingOrder = false;
        return true;
      } catch (e) {
        console.log(e);
        if (e.response && e.response.data) {
          buy.errors.update(e.response.data);
        }

        self.creatingOrder = false;
        return false;
      }
    }),
    loadOrders: flow(function* loadOrders() {
      if (self.ordersLoaded) return true;

      self.loadingOrders = true;

      try {
        const response = yield Api.get('/orders');
        self.orders = deserialize(response.data);
        self.ordersLoaded = true;
        self.loadingOrders = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loadingOrders = false;
        return false;
      }
    }),
    removeOrder(order) {
      if (self.selectedOrder.id === order.id) {
        self.selectedOrder = undefined;
      }
      destroy(order);
    },
    setSelectedOrder(id) {
      self.selectedOrder = id;
    },
  }));

export default types.compose(BaseUpdate, User);
