import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const DestinationAddresses = types.model('DestinationAddresses', {
  BTC: types.maybeNull(types.string),
  XMR: types.maybeNull(types.string),
});

export default types.compose(BaseUpdate, DestinationAddresses);
