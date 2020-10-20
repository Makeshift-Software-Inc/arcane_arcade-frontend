import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const Installer = types.model('Installer', {
  name: types.string,
  url: types.string,
});

export default types.compose(BaseUpdate, Installer);
