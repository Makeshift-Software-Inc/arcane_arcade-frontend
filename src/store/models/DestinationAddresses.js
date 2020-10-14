import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const DestinationAddresses = types.model('DestinationAddresses', {
  BTC: types.maybe(types.string),
  XMR: types.maybe(types.string),
});

export default types.compose(BaseUpdate, DestinationAddresses);
