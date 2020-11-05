import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';
import Category from './Category';

const CategoryListing = types.model('CategoryListing', {
  id: types.maybe(types.string),
  category: types.reference(Category),
  _destroy: false,
});

export default types.compose(BaseUpdate, CategoryListing);
