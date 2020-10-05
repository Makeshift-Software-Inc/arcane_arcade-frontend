import { types, flow } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

import Api from "../../services/Api";

const Notification = types
  .model("Notification", {
    id: types.identifier,
    seen: types.boolean,
    destination_path: types.maybe(types.string),
    message: types.string,
  })
  .actions((self) => ({
    markAsRead: flow(function* markAsRead() {
      self.seen = true;

      try {
        yield Api.put(`/notifications/${self.id}/mark_as_read`);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
  }));

export default types.compose(BaseUpdate, Notification);
