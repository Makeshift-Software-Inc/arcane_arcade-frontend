import { types, getParent } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const OwnedGame = types
  .model('OwnedGame', {
    title: types.string,
    image: types.maybe(types.string),
  })
  .actions((self) => ({}));

export default types.compose(BaseUpdate, OwnedGame);
