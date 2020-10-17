import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

import OwnedGame from './OwnedGame';

// import Api from '../../services/Api';

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
  })
  .views((self) => ({
    completed() {
      return self.status === 'completed';
    },
    active() {
      return !self.completed();
    },
  }))
  .actions(() => ({}));

export default types.compose(BaseUpdate, Order);
