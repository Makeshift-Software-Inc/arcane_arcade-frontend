import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';
import Tag from './Tag';

const ListingTag = types.model('ListingTag', {
  id: types.maybe(types.string),
  tag: types.reference(Tag),
  _destroy: false,
});

export default types.compose(BaseUpdate, ListingTag);
