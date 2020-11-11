import { types, destroy, flow } from 'mobx-state-tree';

import Seller from '../Seller';

import Api from '../../../services/Api';
import deserialize from '../../../utils/deserialize';

const PendingSellers = types
  .model('PendingSellers', {
    sellers: types.array(Seller),
    loading: false,
    loaded: false,
  })
  .actions((self) => ({
    removeSeller(seller) {
      destroy(seller);
    },
    load: flow(function* load() {
      if (self.loaded) return true;

      self.loading = true;

      try {
        const response = yield Api.get('/admins/sellers');
        self.sellers = deserialize(response.data);
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

export default PendingSellers;
