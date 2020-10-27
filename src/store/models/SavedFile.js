import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const SavedFile = types.model('SavedFile', {
  id: types.identifier,
  url: types.string,
  type: types.string,
  _destroy: false,
});

export default types.compose(BaseUpdate, SavedFile);
