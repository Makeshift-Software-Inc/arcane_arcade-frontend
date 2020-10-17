import { types, flow } from 'mobx-state-tree';
import moment from 'moment';

import BaseUpdate from './BaseUpdate';

import OwnedGame from './OwnedGame';

import Api from '../../services/Api';
import deserialize from '../../utils/deserialize';

const Order = types
  .model('Order', {
    id: types.identifier,
    status: types.enumeration([
      'in_progress',
      'unconfirmed',
      'in_escrow',
      'completed',
    ]),
    coin_amount: types.string,
    coin_type: types.enumeration(['BTC', 'XMR']),
    expires_at: types.string,
    preordered: types.boolean,
    been_reviewed: types.boolean,
    fiat_currency: types.string,
    escrow_address: types.string,
    qr_url: types.maybe(types.string),
    created_at: types.string,
    owned_game: OwnedGame,
    reloading: false,
  })
  .views((self) => ({
    completed() {
      return self.status === 'completed';
    },
    active() {
      return !self.completed();
    },
    purchaseDate() {
      return moment(self.created_at).format('MMMM Do YYYY');
    },
  }))
  .actions((self) => ({
    reload: flow(function* reload() {
      if (self.reloading) return false;
      self.reloading = true;

      try {
        const response = yield Api.get(`/orders/${self.id}`);
        const order = deserialize(response.data);
        self.update(order);
        self.reloading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.reloading = false;
        return false;
      }
    }),
  }));

export default types.compose(BaseUpdate, Order);
