import { types, flow } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

import Api from '../../services/Api';

const Order = types
  .model('Order', {
    id: types.identifier,
  })
  .actions((self) => ({}));

export default types.compose(BaseUpdate, Order);
