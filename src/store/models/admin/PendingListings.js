import { types, flow, destroy } from 'mobx-state-tree';

import Game from '../Game';

import Api from '../../../services/Api';
import deserialize from '../../../utils/deserialize';

const PendingListings = types
  .model('PendingListings', {
    listings: types.array(Game),
    loading: false,
    loaded: false,
  })
  .actions((self) => ({
    removeListing(listing) {
      destroy(listing);
    },
    load: flow(function* load() {
      if (self.loaded) return true;

      self.loading = true;

      try {
        const response = yield Api.get('/admins/listings');
        self.listings = deserialize(response.data);
        self.loaded = true;
        self.loading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loading = false;
        return false;
      }
    }),
  }));

export default PendingListings;
