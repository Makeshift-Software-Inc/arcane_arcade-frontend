import { types } from 'mobx-state-tree';

import PendingSellers from './models/admin/PendingSellers';
import PendingListings from './models/admin/PendingListings';

const AdminStore = types.model('AdminStore', {
  pendingSellers: types.optional(PendingSellers, {}),
  pendingListings: types.optional(PendingListings, {}),
});

export default AdminStore;
