import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const Image = types
  .model('Image', {
    original: types.string,
    small: types.maybeNull(types.string),
    large: types.maybeNull(types.string),
  })
  .views((self) => ({
    get smallImage() {
      return self.small || self.original;
    },
    get largeImage() {
      return self.large || self.original;
    },
  }));

export default types.compose(BaseUpdate, Image);
