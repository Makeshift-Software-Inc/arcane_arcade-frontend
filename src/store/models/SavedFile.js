import { types, getRoot } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const SavedFile = types
  .model('SavedFile', {
    id: types.identifier,
    url: types.string,
    type: types.string,
    name: types.string,
    _destroy: false,
    position: 0,
  })
  .views((self) => ({
    keys() {
      // eslint-disable-next-line
      return { id: self.id, _destroy: self._destroy, position: self.position };
    },
  }))
  .actions((self) => ({
    remove() {
      // eslint-disable-next-line
      self._destroy = true;
      const {
        forms: { listing },
      } = getRoot(self);
      listing.repositionFiles();
    },
  }));

export default types.compose(BaseUpdate, SavedFile);
